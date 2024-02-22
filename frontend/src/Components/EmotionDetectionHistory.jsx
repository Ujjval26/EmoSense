import React, { useState, useEffect } from 'react';
import vk from "../assets/images/vk.jpg";
import ro from "../assets/images/ro.jpeg";
import ms from "../assets/images/msd.jpeg";

const EmotionDetectionHistory = () => {
  const [emotionData, setEmotionData] = useState([]);

  const simulatedEmotionData = [
    { image: vk, emotion: 'Calm', date: 'Feb 21, 2024' },
    { image: ro, emotion: 'Neutral', date: 'Feb 18, 2024' },
    { image: ms, emotion: 'Excited', date: 'Feb 13, 2024' }
  ];

  useEffect(() => { 
    setEmotionData(simulatedEmotionData);
  }, []);

  return (
    <div>
      <div>
        <h1 className='text-xl font-semibold'>Emotion Detection History</h1>        
      </div>
      <div>
        {emotionData.map((item, index) => (
          <div key={index} className='flex w-full justify-between items-center mt-6'>
            <div className='flex items-center'>
              <div><img src={item.image} className='w-12 object-cover h-12 rounded-full' alt={`Emotion ${item.emotion}`} /></div>
              <div className='pl-4 text-md'><h1>{item.emotion}<br></br><p className='text-sm hover:cursor-pointer text-[#6b6b6b] hover:text-[#4a4a4a]'>View Deailed Analysis</p></h1></div>
            </div>
            <div>
              <p className='text-sm text-[#6B6B6B]'>{item.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EmotionDetectionHistory;
