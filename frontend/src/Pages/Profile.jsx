import React from 'react';
import { useState ,useEffect} from 'react';
import Sidebar from '../Components/Sidebar';
const Profile = () => {
    const [data, setData] = useState();
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
      }
        , []);

    return (

        <div className="profile-section flex min-h-screen">
            <Sidebar />
        <div className="profile-details ml-32 pt-12">
          <h2>Name: {data?.username}</h2>
          <p>Email: {data?.email}</p>
          <p>Mobile: {data?.phone}</p>
          <p>Age: {data?.age}</p>
          <p>Gender: {data?.gender}</p>
        </div>
      </div>
    );
}

export default Profile;