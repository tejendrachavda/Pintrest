import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { UserData } from '../context/UserContext';
import { LoadingAnimation } from '../components/loding';
import { RxEyeOpen } from "react-icons/rx";
import { LuEyeClosed } from "react-icons/lu";


function Register() {
  const [name, setname] = useState("")
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate()
  const { dataloading, register } = UserData()

  const submitHandler = (e) => {
    e.preventDefault();
    register(name, email, password, navigate);
  }


  return (
    <div className='flex items-center justify-center h-[100vh] w-screen bg-gray-100'>

      <div className="w-full max-w-md m-6 mb-16 p-6 bg-white rounded-lg shadow-md">
        <div className="flex items-center justify-center mb-4">
          <img
            src="https://www.wblibrary.org/site-assets/images/pinterest-logo/@@images/image.png"
            alt="Pinterest Logo"
            className="h-12 w-12"
          />
        </div>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="name">Name:</label>
            <input type="text" value={name} onChange={e => setname(e.target.value)} required className="shadow bg-gray-00 appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500" id="name" placeholder="Enter name" />
          </div>

          <div className="mb-4">
            <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="email">Email:</label>
            <input type="email" value={email} onChange={e => setemail(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500" id="email" placeholder="Enter email" />
          </div>

          <div className="mb-4">
            <label className="block text-red-700 text-sm font-bold mb-2" htmlFor="password">Password:</label>
            <div className="relative">
              <input type={showPassword ? "password" : "text"} value={password} onChange={e => setpassword(e.target.value)} required className="shadow appearance-none border rounded w-full py-2 px-3 text-red-700 leading-tight focus:outline-none focus:shadow-outline focus:border-red-500" id="password" placeholder="Enter password" />
              <button
                type="button"
                className="absolute top-1/2 transform -translate-y-1/2 right-2"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <RxEyeOpen />
                ) : (
                  <LuEyeClosed />
                )}

              </button>
            </div>
          </div>

          <button type="submit" className="bg-red-500 hover:bg-red-700 w-full text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">{dataloading ? <LoadingAnimation /> : "Register"}</button>
        </form>

        <div className="text-center text-sm text-gray-600 mt-4">
          <p className="text-sm text-gray-600 mt-4">Already have an account..
            <Link to="/login" className="font-bold text-red-500 hover:text-red-700">Login</Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register;