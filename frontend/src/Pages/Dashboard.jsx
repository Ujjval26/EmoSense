// import React, { useRef, useEffect, useState } from 'react';
// import Sidebar from '../Components/Sidebar';
// import { FiCamera } from "react-icons/fi";
// import { FiCameraOff } from "react-icons/fi";
// import { Link } from 'react-router-dom';
// import { toast, Toaster } from 'react-hot-toast';

// const ResultItem = ({ timestamp, message }) => (
//     <div className='text-sm text-green-500'>
//         [{timestamp}] - {message}
//     </div>
// );

// const Dashboard = () => {
//     const videoRef = useRef(null);
//     const canvasRef = useRef(null);
//     const [capturedImage, setCapturedImage] = useState(null);
//     const [isCameraOn, setIsCameraOn] = useState(true);
//     const [stream, setStream] = useState(null);
//     const [data, setData] = useState();
//     const [logData, setLogData] = useState([]);
//     const [outputData, setOutputData] = useState(null);

//     const startVideoStream = () => {
//         navigator.mediaDevices.getUserMedia({ video: true })
//             .then(stream => {
//                 if (videoRef.current) {
//                     videoRef.current.srcObject = stream;
//                     setStream(stream);
//                     setLogData(prevLogData => [...prevLogData, { timestamp: new Date().toLocaleString(), message: 'Camera Connection Successful' }]);
//                 }
//             })
//             .catch(error => console.error('Error accessing the camera:', error));
//     };

//     const toggleCamera = () => {
//         if (isCameraOn) {
//             stopVideoStream();
//         } else {
//             startVideoStream();
//         }
//         setIsCameraOn(!isCameraOn);
//     };

//     const stopVideoStream = () => {
//         if (stream) {
//             stream.getTracks().forEach(track => track.stop());
//             setLogData(prevLogData => [...prevLogData, { timestamp: new Date().toLocaleString(), message: 'Camera Connection Closed' }]);
//         }
//     };

//     const takePhoto = async () => {
//         if (videoRef.current) {
//             const video = videoRef.current;
//             const canvas = canvasRef.current;
//             const context = canvas.getContext('2d');
//             context.drawImage(video, 0, 0, canvas.width, canvas.height);
//             const dataURL = canvas.toDataURL('image/png');

//             try {
//                 const response = await fetch('http://localhost:8000/api/model/', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/json'
//                     },
//                     body: JSON.stringify({ image: dataURL })
//                 });

//                 const responseData = await response.json();
//                 console.log(responseData);
//                 setOutputData(responseData); // Store the response data in state
//             } catch (err) {
//                 console.error('Error sending photo:', err);
//             }
//         }
//     };

//     const fetchData = async () => {
//         try {
//             const id = localStorage.getItem("id");
//             const response = await fetch(`http://localhost:8000/api/profile/${id}`, {
//                 method: 'GET',
//                 headers: {
//                     'Accept': 'application/json',
//                     'Content-Type': 'application/json',
//                 }
//             });
//             const data = await response.json();
//             console.log(data);
//             setData(data);
//         } catch (err) {
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         const token = localStorage.getItem("token");
//         if (!token) {
//             window.location.replace('/login');
//         }
//         fetchData();
//         startVideoStream();

//         const intervalId = setInterval(takePhoto, 5000); 
        
//         return () => {
//             stopVideoStream();
//             clearInterval(intervalId);
//         };
//     }, []);

//     return (
//         <div className='bg-[#1a1a1a] w-full text-white flex min-h-screen'>
//             <Sidebar />
//             <Toaster />
//             <div className='w-full ml-16'>
//                 <nav className='w-full flex items-center justify-between bg-[#242424]'>
//                     <h1 className='p-4 px-8 text-lg'>{data?.username}</h1>
//                 </nav>
//                 <div className="md:flex md:flex-row">
//                     <div className='w-[80%] px-4'> {/* Adjusted width to 70% */}
//                         <div className='pl-4 relative' style={{ width: '100%', height: '800px' }}> {/* Adjusted width and height */}
//                             <video ref={videoRef} autoPlay muted className="w-full h-full" style={{ borderRadius: '16px', transform: 'scaleX(-1)' }}></video>

//                             <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
//                             <button className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 p-4 text-white border border-white ${isCameraOn ? "" : "bg-red-500"} rounded-full mb-2`} onClick={toggleCamera}>
//                                 {isCameraOn ? <FiCamera /> : <FiCameraOff />}
//                             </button>
//                         </div>
//                     </div>
//                     <div className='w-[20%] p-4'> {/* Adjusted width to 30% */}
//                         <div className='backdrop-blur-xl bg-white bg-opacity-10 rounded-xl'>
//                             <h1 className='text-center p-4 uppercase text-xl'>Output</h1>
//                             <div className='text-sm pl-6 pb-12'>
//                                 {logData?.map((log, index) => (
//                                     <ResultItem key={index} timestamp={log.timestamp} message={log.message} />
//                                 ))}
//                             </div>
//                             {outputData && (
//                                 <div className='pl-6 pb-12'>
//                                     <h2>Emotions Detected:</h2>
//                                     <ul>
//                                         {outputData?.emotions?.map((emotion, index) => (
//                                             <li key={index}>{emotion}</li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

import React, { useRef, useEffect } from 'react';
import * as tf from '@tensorflow/tfjs';
import * as facemesh from '@tensorflow-models/facemesh';

const FaceDetectionComponent = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const runFacemesh = async () => {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      if (!video || !canvas) return;

      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        video.srcObject = stream;

        const model = await facemesh.load();
        console.log('Facemesh model loaded successfully.');

        video.addEventListener('loadeddata', () => {
          video.play();
        });

        const detectFaces = async () => {
          const predictions = await model.estimateFaces(video, false);
          const ctx = canvas.getContext('2d');

          if (predictions.length > 0) {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.strokeStyle = 'green';
            ctx.lineWidth = 2; // Adjust thickness here
            ctx.fillStyle = 'green'; // Fill style for circles
            predictions.forEach((prediction) => {
              const keypoints = prediction.scaledMesh;

              // Draw keypoints on canvas
              for (let i = 0; i < keypoints.length; i++) {
                const [x, y] = keypoints[i];
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, 2 * Math.PI); // Adjust circle size here
                ctx.stroke();
                ctx.fill();
              }
            });
          }

          requestAnimationFrame(detectFaces);
        };

        detectFaces();
      } catch (error) {
        console.error('Error initializing webcam or loading model:', error);
      }
    };

    runFacemesh();

    return () => {
      const video = videoRef.current;
      if (video && video.srcObject) {
        const tracks = video.srcObject.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  return (
    <div style={{ position: 'relative' }}>
      <video ref={videoRef} width={640} height={480} style={{ position: 'absolute', top: 0, left: 0 }} />
      <canvas ref={canvasRef} width={640} height={480} style={{ position: 'absolute', top: 0, left: 0 }} />
      <h2>sarjan</h2>
    </div>
  );
};

export default FaceDetectionComponent;
