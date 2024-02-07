import React, { useRef, useEffect, useState } from 'react';
import { VscKebabVertical } from "react-icons/vsc";

const Dashboard = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);

  const startVideoStream = () => {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(stream => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(error => console.error('Error accessing the camera:', error));
  };

  const takePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL('image/png');
      setCapturedImage(dataURL);
    }
  };

  useEffect(() => {
    startVideoStream();
  }, []);

  return (
    <div className='bg-[#000010] text-white min-h-screen'>
      <nav className='w-full flex items-center justify-between'>
        <div className='p-8'>
          <h1 className='text-xl'>Capturing your face and emotion please wait... and check the logs for more information....</h1>
          <p className='mt-2 text-gray-600 text-sm'>10th February , 2024 | 9 AM </p>
        </div>
        <div className='p-8'>
          <div className='bg-[rgba(255,255,255,0.1)] text-white flex items-center rounded-full '>
            <p className='py-4 px-24 '>Adam Joseph<br></br><span className='text-left text-sm text-gray-600'>Moderator</span></p>
            <VscKebabVertical className='mr-4' />

          </div>
        </div>
      </nav>
      <div className="md:flex md:flex-row">
        <div className='w-full px-4'>
          <div className='pl-4 rounded-md'>
            <video ref={videoRef} autoPlay muted className="w-full" style={{ borderRadius: '16px' }}></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
            <button className="mt-4 px-12 py-2 bg-blue-500 text-white rounded-md mb-2" onClick={takePhoto}>Take Photo</button>
          </div>
          <div className="md:flex md:flex-row">
            <div className='w-full px-4'>
              <div className='bg-[rgba(255,255,255,0.1)] rounded-xl mt-4 md:mt-0'>
                <h1 className='text-center p-4 uppercase text-xl'>Result</h1>
                <div className='text-sm pl-6 text-green-500'>
                  ---Did you know? Humans can express over 7,000 different facial expressions, and EmoSense is here to decode them!<br></br>
                  ---Fun Fact: The average smile uses 17 muscles! Capture that grin and let EmoSense tell you how genuine it is.<br></br>
                  ---EmoSense Fact Check: Our algorithms have been trained on smiles, frowns, and everything in between. Ready to challenge them?<br></br>
                  ---Ever wonder what your poker face looks like? Let EmoSense reveal the emotions behind your best bluff!<br></br>
                  ---Curious about your mood? EmoSense can help you decode your emotional fingerprint. Just strike a pose!<br></br>

                  **EmoSense Challenge:**<br></br>
                  Strike your most exaggerated emotion and share the results with #EmoSenseChallenge. We'd love to see your emotional masterpieces!            </div>
              </div>
            </div>

          </div>
        </div>
        <div className='w-full md:w-1/2 px-4'>
          <div className='bg-[rgba(255,255,255,0.1)] rounded-xl'>
            <h1 className='text-center p-4 uppercase text-xl'>Output</h1>
            <div className='text-sm pl-6 pb-12 text-green-500'>
              [2024-01-12 10:30:00] - Machine Starting: EmoSense v1.0<br></br>
              [2024-01-12 10:30:05] - Initializing Components...<br></br>
              [2024-01-12 10:30:10] - Loading Configuration...<br></br>
              [2024-01-12 10:30:15] - Loading Emotion Detection Model...<br></br>
              [2024-01-12 10:30:20] - Model Architecture: CNN-EmoNet<br></br>
              [2024-01-12 10:30:25] - Model Loaded Successfully<br></br>
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
              - Emotion: Surprised, Probability: 2.8%<br></br>
              - Emotion: Neutral, Probability: 0.9%<br></br>
              - Emotion: Disgusted, Probability: 0.2%<br></br>
              - Emotion: Fearful, Probability: 0.1%<br></br>
              [2024-01-12 10:31:05] - Saving Results to Database...<br></br>
              [2024-01-12 10:31:10] - Results Successfully Saved<br></br>
              [2024-01-12 10:31:15] - Initiating Cleanup...<br></br>
              [2024-01-12 10:31:20] - Cleaning up Temporary Files...<br></br>
              [2024-01-12 10:31:25] - Shutdown Complete. Awaiting Next Operation...<br></br>            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Dashboard;
