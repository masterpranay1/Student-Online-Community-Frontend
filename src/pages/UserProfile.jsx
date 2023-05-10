import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function ProfileImage() {
    return (
        <div className="flex justify-start items-center">
            <div className="w-52 h-52 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex justify-center items-center">
                <img src='' alt='' />
            </div>
        </div>
    );
}

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
    return (
        <>
            <Navbar />
            <div className="flex flex-row flex-wrap justify-around items-center my-[10rem]">
                <div className="flex flex-col justify-center items-center">
                    <ProfileImage  />
                    <ProfileHeader />
                </div>
                <div className="flex flex-row justify-center items-center">
                    <ChannelList />
                </div>
            </div>
            <Footer />
        </>
    );
}

export default UserProfile;
