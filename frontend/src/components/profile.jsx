
import React, { useState, useEffect } from 'react';
import { Pin } from '../context/PinContext';
import Masonry from '@mui/lab/Masonry';
import { UserData } from '../context/UserContext';

function Profile({ User }) {
    const { followUser , user } = UserData()
    const loggedInUser = user;
    const { pins } = Pin();
    const userPins = pins.filter((pin) => pin.owner === User._id);
    const [isFollow, setIsFollow] = useState(false);
    const [id, setId] = useState('');

    useEffect(() => {
        if (loggedInUser && userPins.length > 0) {
            setIsFollow(loggedInUser.following.includes(userPins[0].owner));
            setId(userPins[0].owner);
        }
    }, [loggedInUser, userPins]);

    const handleFollow = async () => {
        setIsFollow(!isFollow);
        followUser(id);
    };

    return (
        <div className="container mx-auto p-4 mt-10 max-sm:scale-90 max-sm:mt-[-3vh] ">
            <div className="flex flex-col justify-center mt-[-25px] items-center mb-10 bg-gray-100 rounded-lg shadow-md p-4">
                <div className="profile-header flex justify-center items-center m-10">
                    <h1 className="px-8 py-6 text-5xl font-semibold border-4 border-red-500 rounded-full bg-white">
                        {User && User.name.slice(0, 1)}
                    </h1>
                    <div className="flex flex-col ml-4">
                        <h2 className="text-3xl font-bold text-gray-900">{User.name}</h2>
                        <p className="text-md font-medium text-gray-600">{User.email}</p>
                        <div className="flex gap-6 items-center">
                            <p className="mt-3 text-gray-700">follower : {User.follower.length}</p>
                            <p className="mt-3 text-gray-700">following : {User.following.length}</p>
                        </div>
                    </div>
                </div>
                <div>
                    {
                        loggedInUser._id === User._id ? "" : <button
                        style={{
                            backgroundColor: isFollow ? 'grey' : 'red',
                            color: isFollow ? 'black' : 'white',
                            margin: '10px 0 0 0',
                            padding: '10px 20px',
                            borderRadius: '5px',
                            border: 'none'
                        }}
                        onClick={handleFollow}
                    >
                        {isFollow ? 'Unfollow' : 'Follow'}
                    </button>
                    }
                   
                </div>
            </div>
            <div className="profile-pins">
                <h3 className="text-2xl font-bold mb-4">Pins:</h3>
                <div className="flex flex-wrap justify-center">
                <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2} className='flex flex-wrap'>
                        {userPins.map((pin, index) => (
                            <div key={index} className="bg-white shadow-md p-4 mb-4 rounded w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
                                <img src={pin.image.url} alt="Pin Image" />
                                {/* <h1 className="text-3xl font-bold max-sm:text-xl text-black-600">{pin.title}</h1>
                                <p className="max-sm:text-sm text-gray-600">{pin.pin}</p> */}
                            </div>
                        ))}
                    </Masonry>
                </div>
            </div>
        </div>
    );
}

export default Profile;