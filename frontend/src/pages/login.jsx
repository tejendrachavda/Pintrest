import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../context/UserContext';
import { LoadingAnimation } from '../components/loding';
import { RxEyeOpen } from "react-icons/rx";
import { LuEyeClosed } from "react-icons/lu";


function Login() {

  window.location.reload
  const [email, setemail] = useState('')
  const [password, setpassword] = useState('')
  const [showPassword, setShowPassword] = useState(true);

  const navigate = useNavigate()

  const { login, dataloading } = UserData()

  const loginHandler = (e) => {
    e.preventDefault();
    console.log(email, password);

    login(email, password, navigate)


  }
  return (
    <div className="h-screen flex justify-center items-center">
      <div className="w-full max-w-md m-6 mb-16 p-6 bg-white rounded-lg shadow-md">
        <div className="flex justify-center mb-4">
          <img
            src="https://www.wblibrary.org/site-assets/images/pinterest-logo/@@images/image.png"
            alt="Pinterest Logo"
            className="h-12 w-12"
          />
        </div>
        <div className="mb-4">
          <form onSubmit={loginHandler} className="flex flex-col space-y-4">
            <div className="flex flex-col space-y-2">
              <label className="block text-red-700 text-sm font-bold" htmlFor="email">Email:</label>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setemail(e.target.value)}
                required
                className="block w-full p-2 pl-5 text-md text-gray-700 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-red-200"
              />
            </div>
            <div className="flex flex-col space-y-2">
              <label className="block text-red-700 text-sm font-bold" htmlFor="password">Password:</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setpassword(e.target.value)}
                  required
                  className="block w-full p-2 pl-5 text-md text-gray-700 rounded-lg bg-gray-100 border border-gray-300 focus:outline-none focus:ring focus:ring-red-200"
                />
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
            <button
              disabled={dataloading}
              type="submit"
              className="w-full px-6 py-2 mt-6 text-sm text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring focus:ring-blue-200"
            >
              {dataloading ? <LoadingAnimation /> : 'Login'}
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">Don't have an account?
              <Link to="/register" className=' text-red-500 hover:text-red-700 font-bold'> Register</Link>
            </p>
          </div>
        </div>
      </div>
    </div>

  );
}

export default Login
