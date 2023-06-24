import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

import LoginContext from '../contexts/LoginContext';
import { useNavigate  } from 'react-router-dom';

function ProfileHeader({ name, email }) {

    name = name || 'User'
    email = email || 'email@here.com'
    return (
        <div className="text-center mt-4">
            <h1 className="text-2xl font-bold">{name}</h1>
            <p className="text-gray-600">{email}</p>
        </div>
    );
}

function ChannelList({ channels }) {

    channels = channels || [
        {
            id: '1',
            name: 'Channel 1',
            position: 'Admin'
        },
    ];

    const channelList = channels.map(channel => (
        <ChannelItem key={channel.id} name={channel.name} position={channel.position} />
    ));

    return (
        <div className="text-center mt-8">
            <h2 className="text-lg font-bold mb-2">Channels</h2>
            <ul>
                {channelList}
            </ul>
        </div>
    );
}


function ChannelItem({ name, position }) {
    return (
        <li className="text-gray-700 flex justify-between items-center mb-2">
            <h2 className="text-xl">
                {name}
            </h2>
            <p className="ms-12">
                <span className="badge badge-lg ">{position}</span>
            </p>
        </li>
    );
}



function UserProfile() {

    const handleButtonClick = async () => {
        localStorage.removeItem('isLogin');
        localStorage.removeItem('role');
        localStorage.removeItem('channels');
        localStorage.removeItem('state');
        localStorage.removeItem('active-group-index');
        localStorage.removeItem('active-group-id');


        const res = await fetch(
            'https://student-online-community.onrender.com/api/users/logout',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': 'true'
                },
                credentials: 'include'
            })

        const data = await res.json();
        console.log(data);
        if (data.success) {
            window.location.href = '/';
        } else {
            alert('Something went wrong');
        }
    }
    const navigate = useNavigate();
    const navigateToAllChannels = () => {
        navigate('/channels');
    }

    const { userId } = useContext(LoginContext);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [channels, setChannels] = useState([]);

    useEffect(() => {
        const getUserById = async () => {
            const res = await fetch(
                `https://student-online-community.onrender.com/api/users/getUserById/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': 'true'
                    },
                    credentials: 'include'
                }
            )

            const data = await res.json();
            if (res.ok) {
                setName(data.name);
                setEmail(data.email);
                setChannels(data.channels.map(channel => {
                    return {
                        id: channel.channelId._id,
                        name: channel.channelId.name,
                        position: channel.role
                    }
                }));
            }
        }

        getUserById();
    }, [userId])

    return (
        <>
            <Navbar />
            <div className='p-4 md:p-8 text-2xl font-bold text-secondary cursor-pointer uppercase'
                onClick={navigateToAllChannels}
            >
                All Channels
            </div>
            <div className='flex flex-col justify-center items-center'>
                <div className="flex flex-col flex-wrap justify-around items-center min-h-[60vh] my-8">
                    <div className="flex flex-col justify-center items-center">
                        <ProfileHeader name={name} email={email} />
                    </div>
                    <div className="flex flex-row justify-center items-center">
                        <ChannelList channels={channels} />
                    </div>
                </div>
                <button className='btn btn-secondary btn-outline m-4 w-fit'
                    onClick={handleButtonClick}
                >
                    Logout
                </button>
                <Footer />
            </div>
        </>
    );
}

export default UserProfile;
