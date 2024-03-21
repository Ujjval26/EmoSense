import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import vk from "../assets/images/vk.jpg";
import ro from "../assets/images/ro.jpeg";
import ms from "../assets/images/msd.jpeg"
import sd from "../assets/images/sd.png"
import rj from "../assets/images/rj.jpeg"
import jb from "../assets/images/jb.jpeg"
import kl from "../assets/images/kl.jpeg"
import shami from "../assets/images/shami.jpeg"
const Report = () => {
    const [selectedButton, setSelectedButton] = useState('All');

    const handleClick = (button) => {
        setSelectedButton(button);
    };

    const sortOptions = ['All', 'Happiness', 'Surprise', 'Fear', 'Anger', 'Sadness', 'Neutral', 'Contempt'];
    const imageData = [
        { id: 1, src: vk, emotion: 'Happiness' },     ,
        { id: 2, src: jb, emotion: 'Surprise' },
        { id: 3, src: ms, emotion: 'Fear' },
        { id: 4, src: shami, emotion: 'Anger' },
        { id: 5, src: ro, emotion: 'Sadness' },
        { id: 6, src: sd, emotion: 'Neutral' },
        { id: 7, src: kl, emotion: 'Surprise' },
        { id: 8, src: rj, emotion: 'Contempt' }
    ];

    const filteredImages = selectedButton === 'All' ? imageData : imageData.filter(image => image.emotion === selectedButton);

    return (
        <div className="report-section flex min-h-screen bg-[#1a1a1a] text-white">
            <Sidebar />
            <div className='ml-24 p-12 flex flex-col w-full'>
                <div>
                    <h1 className='text-3xl font-bold'>Analysis</h1>
                </div>
                <div className='w-full '>
                    <div className='flex justify-between w-full my-8'>
                        {sortOptions.map((button, index) => (
                            <button
                                key={index}
                                className={`flex-grow ${selectedButton === button ? 'bg-[#fff]' : 'bg-[#2F2F2F]'} ${selectedButton === button ? 'text-[#2F2F2F]' : 'text-[white]'} text-sm inline-block py-2 px-3 mx-2 rounded-md`}
                                onClick={() => handleClick(button)}
                            >
                                {button}
                            </button>
                        ))}
                    </div>
                </div>
                <div className='grid gap-4 grid-cols-4'>
                {filteredImages.map((image) => (
                    <div key={image.id} id={image.emotion}>
                        <div className='w-64 h-64'><img src={image.src} alt={`Emotion ${image.emotion}`} className='w-64 h-64 rounded-md object-cover' /></div>
                        <div className='mt-2'>
                            <h1>Image {image.id}</h1>
                            <h1 className='text-sm text-[#6b6b6b]'>Emotion: {image.emotion}</h1>
                        </div>
                    </div>
                ))}
                </div>
            </div>
        </div>
    );
}

export default Report;
