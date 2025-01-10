
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { IoHomeOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { SlUserFollowing } from "react-icons/sl";
import { FaPlus } from "react-icons/fa";




function Navbar() {

  const navigate = useNavigate();
  const { logout , user } = UserData()

  // console.log(user);
  
  const User = user;

  const handleLogout = () => {
    logout(User._id, navigate)
  }

  return (
    <div className="w-full bg-gray-100 p-4">
      <div className="flex justify-between items-center md:flex-row lg:flex-row flex-col">
        <Link to="/" className="flex items-center mr-5 z-10 max-sm:mr-[83vw] max-sm:fixed">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Pinterest-logo.png/600px-Pinterest-logo.png"
            alt=""
            className="h-6 md:mr-2 max-sm:h-12"
          />
          <span className="text-red-600 text-xl font-bold hidden md:block lg:block">Pinterest</span>
        </Link>
        <div className="flex items-center  md:gap-10 lg:gap-10 gap-5 flex-col md:flex-row lg:flex-row">
          <div className="hidden md:block lg:block">
            <div className='flex gap-7'>

              <Link to="/">
                <p>Home</p>
              </Link>
              <Link to="/following">
                <p>Following</p>
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-2 h-10 max-sm:fixed z-10">
            <button onClick={handleLogout} className=" max-sm:ml-[78vw] max-sm:mr-1 max-sm:mt-[10px] bg-black text-white p-2 rounded-3xl px-5 font-semibold">Logout</button>
            <Link to="/create">
              <button className="bg-red-600 max-sm:hidden text-white p-2 rounded-3xl px-5 font-semibold">
                Create
              </button>
            </Link>
          </div>
          <div>
            <Link to="/profile">
              <p
                className="w-[20px] h-[20px] max-sm:hidden text-black font-medium text-2xl border-2 border-red-500 flex items-center justify-center p-5 rounded-full"
              >
                {User ? User?.name?.slice(0, 1) : ""}
              </p>
            </Link>
          </div>
          <div className="md:hidden lg:hidden fixed mt-5 p-2 items-center gap-2 w-96 border-red-500 bg-white rounded-2xl flex bottom-10 z-30 justify-center border shadow-md">
            <Link to="/">
              <button className='home border border-red-500 px-3 py-1 rounded-full  text-black hover:bg-red-200 transition duration-200 ease-in-out'><IoHomeOutline /></button>
            </Link>
            <Link to="/following">
              <button className='follower border border-red-500 px-3 py-1 rounded-full text-black hover:bg-red-200 transition duration-200 ease-in-out'><SlUserFollowing /></button>
            </Link>
            <Link to="/create">
              <button className='create border border-red-500 px-3 py-1 rounded-full text-black hover:bg-red-200 transition duration-200 ease-in-out'><FaPlus /></button>
            </Link>
            <Link to="/profile">
              <button className='profile border border-red-500 px-3 py-1 rounded-full text-black hover:bg-red-200 transition duration-200 ease-in-out'><CgProfile /></button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  );
}

export default Navbar;
