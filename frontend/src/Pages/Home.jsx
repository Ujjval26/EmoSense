import React, { useState } from 'react';
import Sidebar from '../Components/Sidebar';
import { CiCamera } from "react-icons/ci";
import { Link } from 'react-router-dom';
import { toast, Toaster } from 'react-hot-toast';
import vk from "../assets/images/vk.jpg";
import ro from "../assets/images/ro.jpeg";
import ms from "../assets/images/msd.jpeg";

const ResultItem = ({ imageSrc, emotion, details }) => (
    <div className='flex justify-between items-center mt-4'>
        <div>
            <img src={imageSrc} className='h-16 w-16 rounded-md object-cover' alt="Result" />
        </div>
        <div className='ml-4'>
            <p className='text-white'>{emotion}</p>
            <p className='text-sm text-[#6b6b6b]'>{details}</p>
        </div>
    </div>
);

const Home = () => {
    const [previewImage, setPreviewImage] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setPreviewImage(null);
            toast.error("Please select an image file.");
        }
    };

    return (
        <div className="profile-section flex min-h-screen bg-[#1a1a1a] text-white w-full">
            <Sidebar />
            <Toaster />
            <div className='ml-24 p-12 flex justify-between '>
                <div>
                    <div>
                        <h1 className='text-3xl font-bold'>Detect Emotion</h1>
                        <p className='text-sm py-4'>Upload a photo or capture a facial expression to analyze emotions</p>
                    </div>
                    <div className='bg-[#242424] rounded-md p-4 flex justify-between items-center'>
                        <div>
                            <h1 className='font-bold'>Upload a Photo</h1>
                            <p className='text-sm mt-1 text-[#6b6b6b]'>Use a high quality image for the best result</p>
                            <div className="flex items-center mt-4">
                                <label htmlFor="fileInput" className="relative inline-block bg-[#2E2E2E] text-white rounded-lg text-sm px-4 py-2 cursor-pointer">
                                    Choose File
                                    <input id="fileInput" type="file" className="hidden" onChange={handleFileChange} accept="image/*" />
                                </label>
                            </div>
                        </div>
                        <div>
                            {previewImage && (
                                <img src={previewImage} alt="Preview" className="ml-4 w-20 h-20 rounded-md object-cover" />
                            )}
                        </div>
                        <div>
                        </div>
                    </div>
                    <div className='flex justify-center my-4'>
                        <Link to="/dashboard">
                            <button className='flex items-center p-4 rounded-lg text-white bg-[#2E2E2E] text-md font-bold'>
                                <CiCamera className='text-2xl mr-2' />
                                Capture a photo
                            </button>
                        </Link>
                    </div>
                </div>
                <div className='ml-32'>
                    <div>
                        <h1 className='font-bold py-4 text-3xl'>Recent Results</h1>
                    </div>
                    <div>
                        <ResultItem imageSrc={vk} emotion="Happy" details="Neutral: 0.2% Happy: 99% Sad: 0.1% Angry: 0.5% Surprised: 0.2% Confidence: 92%" />
                        <ResultItem imageSrc={ro} emotion="Sad" details="Neutral: 1% Happy: 40% Sad: 59% Angry: 0.0% Surprised: 0.0% Confidence: 85%" />
                        <ResultItem imageSrc={ms} emotion="Angry" details="Neutral: 12% Happy: 21% Sad: 0% Angry: 98% Surprised: 0.2% Confidence: 0.8%" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Home;
