import React, { useRef, useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { FiCamera } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';

const ResultItem = ({ timestamp, message }) => (
    <div className='text-sm text-green-500'>
        [{timestamp}] - {message}
    </div>
);

const Dashboard = () => {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [capturedImage, setCapturedImage] = useState(null);
    const [isCameraOn, setIsCameraOn] = useState(true);
    const [stream, setStream] = useState(null);
    const [data, setData] = useState();
    const [logData, setLogData] = useState([]);

    const startVideoStream = () => {
        navigator.mediaDevices.getUserMedia({ video: true })
            .then(stream => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream;
                    setStream(stream);
                    logData.push({ timestamp: new Date().toLocaleString(), message: 'Camera Connection Successful' });
                }
            })
            .catch(error => console.error('Error accessing the camera:', error));
    };

    const toggleCamera = () => {
        if (isCameraOn) {
            stopVideoStream();
        } else {
            startVideoStream();
        }
        setIsCameraOn(!isCameraOn);
    };

    const stopVideoStream = () => {
        if (stream) {
            stream.getTracks().forEach(track => track.stop());
            logData.push({ timestamp: new Date().toLocaleString(), message: 'Camera Connection Closed' });
        }
    };

    const takePhoto = async () => {
        if (videoRef.current) {
            const video = videoRef.current;
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
            const dataURL = canvas.toDataURL('image/png');

            try {
                const response = await fetch('http://localhost:8000/api/photo/', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ image_data: dataURL })
                });

                const responseData = await response.json();
                console.log(responseData);
            } catch (err) {
                console.error('Error sending photo:', err);
            }
        }
    };

    const fetchData = async () => {
        try {
            const id = localStorage.getItem("id");
            const response = await fetch(`http://localhost:8000/api/profile/${id}`, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                }
            });
            const data = await response.json();
            console.log(data);
            setData(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            window.location.replace('/login');
        }
        fetchData();
        startVideoStream();
        return () => {
            stopVideoStream();
        };
    }, []);

    return (
        <div className='bg-[#1a1a1a] w-full text-white flex min-h-screen'>
            <Sidebar />
            <Toaster />
            <div className='w-full ml-16'>
                <nav className='w-full flex items-center justify-between bg-[#242424]'>
                    <h1 className='p-4 px-8 text-lg'>{data?.username}</h1>
                </nav>
                <div className="md:flex md:flex-row">
                    <div className='w-[55%] px-4'>
                        <div className='pl-4 relative' style={{ width: '640px', height: '360px' }}>
                            <video ref={videoRef} autoPlay muted className="w-full h-full" style={{ borderRadius: '16px' }}></video>
                            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                            <button className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 p-4 text-white border border-white ${isCameraOn ? "" : "bg-red-500"} rounded-full mb-2`} onClick={toggleCamera}>
                                {isCameraOn ? <FiCamera /> : <FiCameraOff />}
                            </button>
                            <button className="mt-2 absolute left-1/2 transform -translate-x-1/2 px-12 py-2 bg-blue-500 text-white rounded-md mb-2" onClick={takePhoto}>Take Photo</button>
                        </div>
                    </div>
                    <div className='w-[45%] p-4'>
                        <div className='backdrop-blur-xl bg-white bg-opacity-10 rounded-xl'>
                            <h1 className='text-center p-4 uppercase text-xl'>Output</h1>
                            <div className='text-sm pl-6 pb-12'>
                                {logData.map((log, index) => (
                                    <ResultItem key={index} timestamp={log.timestamp} message={log.message} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Dashboard;
