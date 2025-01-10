import React, { useState } from 'react';
import { Pin } from '../context/PinContext';
import { useNavigate } from 'react-router-dom';
import { LoadingAnimation } from '../components/loding';

function CreatePin() {

    const navigate = useNavigate()
    const { create_Pin, dataloading } = Pin();

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(null);

    const post = (e) => {
        e.preventDefault();
        console.log(image);

        const formData = new FormData()

        formData.append("title", title)
        formData.append("pin", description)
        formData.append("image", image)

        create_Pin(formData, navigate);

    }

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
        const reader = new FileReader();
        reader.onload = () => {
            setPreview(reader.result);
        };
        reader.readAsDataURL(e.target.files[0]);
    }



    return (
        <form onSubmit={post} method='post' className="max-w-lg mt-4 mb-4 mx-auto p-8 bg-red-600 bg-opacity-90 backdrop-filter backdrop-blur-md rounded-3xl shadow-2xl border border-red-700 max-sm:scale-75">

            {/* Image Upload Section */}
            <div className="mb-8">
                <label className="block text-white text-sm font-bold mb-3" htmlFor="image">
                    Upload Image:
                </label>
                <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center px-6 py-8 bg-red-700 bg-opacity-70 backdrop-filter backdrop-blur-md rounded-3xl shadow-lg tracking-wide uppercase border-2 border-dashed border-red-500 cursor-pointer hover:bg-red-800 transition-all duration-300">
                        <svg className="w-10 h-10 text-red-200" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                            <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                        </svg>
                        <span className="mt-3 text-base leading-normal text-red-200">Select a file</span>
                        <input type="file" name="image" className='hidden' accept='image/*' onChange={(e) => handleImageChange(e)} />
                    </label>
                    {preview && (
                        <img src={preview} alt="Preview" className="w-48 h-48 object-cover rounded-3xl ml-4" />
                    )}
                </div>
            </div>

            {/* Title Input Section */}
            <div className="mb-8">
                <label className="block text-white text-sm font-bold mb-3" htmlFor="title">
                    Title:
                </label>
                <input
                    className="shadow appearance-none border-2 border-red-500 rounded-3xl w-full py-3 px-4 text-white placeholder-red-200 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 bg-red-700 bg-opacity-70 backdrop-filter backdrop-blur-md transition-all duration-300"
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter title"
                />
            </div>

            {/* Description Input Section */}
            <div className="mb-10">
                <label className="block text-white text-sm font-bold mb-3" htmlFor="description">
                    Description:
                </label>
                <input
                    className="shadow appearance-none border-2 border-red-500 rounded-3xl w-full py-3 px-4 text-white placeholder-red-200 leading-tight focus:outline-none focus:ring-2 focus:ring-red-400 bg-red-700 bg-opacity-70 backdrop-filter backdrop-blur-md transition-all duration-300"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter description"
                ></input>
            </div>

            {/* Submit Button */}
            <div className="flex items-center justify-center">
                <button
                    className="bg-red-700 bg-opacity-80 backdrop-filter backdrop-blur-md text-white font-bold py-3 px-8 rounded-3xl shadow-lg hover:bg-red-800 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-red-400 transition-all duration-300"
                    type="submit"
                >
                    {dataloading ? <LoadingAnimation /> :
                        <span>Create Pin</span>
                    }
                </button>
            </div>

        </form>
    );
}






export default CreatePin;