import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProfileHeader() {
    return (
        <div className="text-center mt-4">
            <h1 className="text-2xl font-bold">Elon Musk</h1>
            <p className="text-gray-600">elon@spacex.com</p>
        </div>
    );
}

function ChannelList() {
    const dummyChannels = [
        { id: 1, name: 'CU', position: 'Member' },
        { id: 2, name: 'IEEE', position: 'Member' },
        { id: 3, name: 'CSE', position: 'Moderator' },
        { id: 4, name: 'MBA', position: 'Member' }
    ];

    const channelList = dummyChannels.map(channel => (
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

        const res = await fetch('http://localhost:5000/api/users/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': 'true'
            },
            credentials: 'include'
        })

        const data = await res.json();
        console.log(data);
        if(data.success) {
            window.location.href = '/';
        } else {
            alert('Something went wrong');
        }
    }

    return (
        <div className='flex flex-col justify-center items-center'>
            <Navbar />
            <div className="flex flex-col flex-wrap justify-around items-center min-h-[60vh] my-8">
                <div className="flex flex-col justify-center items-center">
                    <ProfileHeader />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <ChannelList />
                </div>
            </div>
            <button className='btn btn-secondary btn-outline m-4 w-fit' 
            onClick={handleButtonClick}
            >
                Logout
            </button>
            <Footer />
        </div>
    );
}

export default UserProfile;
