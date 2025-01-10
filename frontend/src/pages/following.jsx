import React, { useEffect } from 'react'
import { UserData } from '../context/UserContext';
function Following() {

    // console.log(user._id);

    const { following, followingUser, user } = UserData()
    // console.log(following.users);

    // console.log(user , following);

    const Users = following.users
    // console.log(Users);

    useEffect(() => {
        followingUser(user._id)
    }, [user._id])


    return (
        <div className="following bg-gray-100  max-sm:w-[100vw] max-sm:h-[100vh] max-sm:overflow-auto">



            <div className="container mx-auto max-sm:w-1/2 max-sm:flex  p-4 ">
                <div className="flex flex-wrap gap-7">
                    {
                        Users?.length > 0 ? Users?.map((user, index) => (

                            <div key={index} className="bg-white space-y-9 max-sm:w-[100%] max-sm:h-1/2  rounded-3xl shadow-md p-4 w-64 h-64 flex flex-col items-center justify-center text-4xl font-semibold">
                                <h1 className="text-5xl max-sm:text-3xl font-bold mb-4 max-sm:mb-1">{user.name.charAt(0)}</h1>
                                <div className="flex gap-3 max-sm:gap-2">
                                    <p className="text-lg font-medium mb-2 max-sm:text-sm max-sm:mb-0">Name:</p>
                                    <p className="text-lg font-medium mb-4 max-sm:text-sm max-sm:mb-2 ">{user.name}</p>
                                </div>
                            </div>

                        )) :
                            <h1 className="text-3xl font-light mt-[30vh] mb-4 text-black w-[30vw] text-center">You haven't followed anyone yet.</h1>
                    }
                </div>
            </div>

        </div>
    )
}

export default Following