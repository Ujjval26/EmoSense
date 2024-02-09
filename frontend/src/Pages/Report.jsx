import React, { useState, useEffect } from 'react';
import Sidebar from '../Components/Sidebar';
import { RiEmotionHappyLine } from "react-icons/ri";
import { TfiFaceSad } from "react-icons/tfi";
import { FaRegFaceAngry } from "react-icons/fa6";
import { BsEmojiSurprise } from "react-icons/bs";

const EmotionCard = ({ icon, title }) => {
    return (
        <div className='ml-6 card border p-5 border-[#eee] min-w-[21vw] max-w-[21vw] inline-block rounded-md'>
            <div className='flex items-center '>
                <div className='bg-[#543813] w-12 h-12 rounded-md items-center grid justify-center'>
                    <h1 className='text-3xl'>{icon}</h1>
                </div>
                <div className='ml-4'>
                    <h1>{title}</h1>
                </div>
            </div>
            <div className='flex items-center justify-between'>
                <h1 className='text-3xl mt-6'>80%</h1>
                <h1 className='mt-4 ml-6 bg-[#543813] inline-block py-2 px-4 text-sm rounded-md'>Normal</h1>
            </div>
        </div>
    );
};

const Report = () => {
    const [data, setData] = useState([]);

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
    }, []);

    return (
        <div className='flex min-h-screen bg-[#000010] text-white '>
            <Sidebar />
            <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet"></link>

            <section className='ml-16'>
                <div className='grid grid-cols-2 mt-6 p-4 pl-12 inline-block w-[43%]'>
                    <div>
                        <h1>Name: {data.username}</h1>
                        <h1 className='mt-2'>Age: {data.age}</h1>
                    </div>
                    <div>
                        <h1>Gender: {data.gender}</h1>
                        <h1 className='mt-2'>Contact Number: {data.phone}</h1>
                    </div>
                </div>
                <div className='lg:flex mt-6 pl-12'>
                    <EmotionCard icon={<RiEmotionHappyLine />} title="Happy" />
                    <EmotionCard icon={<TfiFaceSad />} title="Sad" />
                    <EmotionCard icon={<FaRegFaceAngry />} title="Anger" />
                    <EmotionCard icon={<BsEmojiSurprise />} title="Surprise" />
                </div>
                <div className='lg:flex mt-6 pl-6'>
                    <EmotionCard icon={<RiEmotionHappyLine />} title="Disgust" />
                    <EmotionCard icon={<RiEmotionHappyLine />} title="Neutral" />
                </div>
            </section>
        </div>
    );
};

export default Report;
