import React, { useRef, useEffect, useState } from 'react';
import { VscKebabVertical } from "react-icons/vsc";
import Sidebar from '../Components/Sidebar';
import { FiCamera } from "react-icons/fi";
import { FiCameraOff } from "react-icons/fi";

const Dashboard = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [stream, setStream] = useState(null);
  const [data,setData] = useState();
  const startVideoStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setStream(stream);
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
      // navigator.mediaDevices.getUserMedia({ video: false })
      stream.getTracks().forEach(track => track.stop());
      // setStream(null);
    }
  };
  const takePhoto = async () => {
    // Capture the image data
    if (videoRef.current) {
        const video = videoRef.current;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataURL = canvas.toDataURL('image/png');

        // Send the image data to the backend
        try {
            const response = await fetch('http://localhost:8000/api/photo/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json' // Specify JSON content type
                },
                body: JSON.stringify({ image_data: dataURL }) // Send image_data as JSON
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
      stopVideoStream(); // Cleanup function to stop camera when component unmounts
    };
  }, []);

  return (
    <div className='bg-[#000010] w-full text-white flex min-h-screen'>
      <Sidebar />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>
      <div className='w-full ml-16'>
        <nav className='w-full flex items-center justify-between'>
          <h1 className='p-4 px-8 text-lg'>{data?.username}</h1>
        </nav>
        <div className="md:flex md:flex-row">
          <div className='w-[55%] px-4'>
            <div className='pl-4 relative'>
              <video ref={videoRef} autoPlay muted className="w-full" style={{ borderRadius: '16px' }}></video>
              <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
              <button className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 p-4 text-white border border-white ${isCameraOn?"":"bg-red-500"} rounded-full mb-2`} onClick={toggleCamera}>
                {isCameraOn ? <FiCamera /> : <FiCameraOff />}
              </button>
              <button className="mt-2 absolute left-1/2 transform -translate-x-1/2 px-12 py-2 bg-blue-500 text-white rounded-md mb-2" onClick={takePhoto}>Take Photo</button>
            </div>
          </div>
          <div className='w-[45%] p-4'>
            <div className='backdrop-blur-xl bg-white bg-opacity-10 rounded-xl'>
              <h1 className='text-center p-4 uppercase text-xl'>Output</h1>
              <div className='text-sm pl-6 pb-12 text-green-500'>
              [2024-01-12 10:30:00] - Machine Starting: EmoSense v1.0<br></br>
              [2024-01-12 10:30:05] - Initializing Components...<br></br>
              [2024-01-12 10:30:10] - Loading Configuration...<br></br>
              [2024-01-12 10:30:15] - Loading Emotion Detection Model...<br></br>            
              [2024-01-12 10:30:30] - Establishing Connection to Camera...<br></br>
              [2024-01-12 10:30:35] - Camera Connection Successful<br></br>
              [2024-01-12 10:30:40] - Preparing for Face Detection...<br></br>
              [2024-01-12 10:30:45] - Face Detection Module Initialized<br></br>
              [2024-01-12 10:30:50] - Initiating Face Emotion Scan...<br></br>
              [2024-01-12 10:30:55] - Face Detected: Analyzing Emotions...<br></br>
              [2024-01-12 10:31:00] - Emotion Analysis Complete:<br></br>
              - Emotion: Happy, Probability: 87.3%<br></br>
              - Emotion: Sad, Probability: 5.1%<br></br>
              - Emotion: Angry, Probability: 3.6%<br></br>
              - Emotion: Surprised, Probability: 2.8%<br></br>                           </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
