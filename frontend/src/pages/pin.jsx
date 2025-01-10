import React, { useEffect, useState, } from 'react'
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom'
import { Pin } from '../context/PinContext'
import { LoadingAnimation } from '../components/loding';
import { IoSendOutline } from "react-icons/io5";
import { UserData } from '../context/UserContext';

function Pin_page() {

  // get pin owner id  check  it`s include or not in following 
  // owner is include in logged in User that show unfollow otherwise follow 

  // const user = Cookies.get('user') ? JSON.parse(Cookies.get('user')) : null;
  const params = useParams()
  const location = useLocation()
  const { user } = UserData();
  // console.log(location.state.owner);
  const owner = location.state.owner;

  // console.log('ownerid :' , owner);

  const { followUser } = UserData()
  const User = user;
  // const { pins } = Pin();
  // const userPins = pins.filter((pin) => pin.owner !== User._id);
  const [isFollow, setIsFollow] = useState(false);
  const [id, setId] = useState('');

  // console.log(User);



  useEffect(() => {

    setIsFollow(User.following.includes(owner));
    setId(owner);

  }, [params.id, owner]);

  // console.log(params);




  const handleFollow = () => {
    setIsFollow(!isFollow);
    followUser(id);
  };

  const navigate = useNavigate()
  const { onePin, dataloading, pin, update_Pin, commentOnpin, delete_Pin } = Pin()



  const [edit, setEdit] = useState(false)
  const [title, setTitle] = useState()
  const [upin, setPin] = useState()
  const [firstClick, setFirtsclick] = useState(true)
  const [comment, setComment] = useState()






  const handleEdit = () => {
    try {
      if (firstClick == true) {
        //first click run this
        setEdit(!edit)
        setPin(pin?.pin)
        setTitle(pin?.title)
        setFirtsclick(false)
      }
      else {
        //second click run this
        update_Pin(pin._id, title, upin, setEdit)
        setFirtsclick(true)
      }
    } catch (error) {
      console.error('Error updating pin:', error)
    }
  }

  const handleComment = () => {
    console.log(comment);
    commentOnpin(comment, params.id)
    setComment("")
  }

  const saveImage = () => {
    const image = pin.image.url;
    console.log(image);

  }

  const deletePin = () => {
    delete_Pin(params.id)
    navigate("/")
    window.location.reload()
  }

  useEffect(() => {
    onePin(params.id)
  }, [params.id])

  return (
    <>
      {
        dataloading ? <LoadingAnimation /> :
          <div className="pin-page max-sm:hidden h-[89vh] w-[100%] flex items-center justify-center">
            <div className='flex w-[70%] p-4 bg-white border shadow-lg rounded-3xl'>
              <div className='h-[70vh] w-[60vh] object-cover overflow-auto '>
                {
                  pin?.image?.url ? <img src={pin.image.url} alt="" className='rounded-3xl' /> : ""
                }
              </div>
              <div>
                <div className='flex items-end justify-end w-[40vw] gap-5 '>
                  <button className="border border-red-600 text-gray-500 font-semibold mt-3 py-2 px-4 rounded-full">Read it</button>
                  <button onClick={saveImage} className="bg-red-600  hover:bg-red-700 text-white font-semibold mt-3 py-2 px-4 rounded-full">Save</button>
                </div>
                <div className="flex flex-col space-y-4 mt-4 ml-10 p-4">

                  {
                    edit ? <input type="text" placeholder='Enter Title here' value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 p-2 pl-5 text-md text-gray-700 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600" />
                      : <h1 className="text-5xl font-medium">{pin.title}</h1>
                  }

                  {
                    edit ? <input type="text" placeholder='Enter Pin here' value={upin} onChange={(e) => setPin(e.target.value)} className="w-full h-10 p-2 pl-5 text-md text-gray-700 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600" />
                      : <p className="text-lg text-black font-light pl-1 pt-7">{pin.pin}</p>
                  }

                  <div className='p-2 border border-red-600 w-fit rounded-full'>
                    <p className="text-lg text-black font-light  pl-2 pr-2">tehas </p>
                  </div>
                  <Link to={`/owner/${pin?.owner?._id}`}>
                    <div className='pt-10 flex items-center gap-2'>
                      <h1 className='border border-red-600 text-3xl h-14 w-14 p-1 flex items-center justify-center rounded-full'>
                        {
                          pin?.owner?.name.slice(0, 1)
                        }
                      </h1>
                      <div className='flex flex-col'>
                        {pin && pin.owner && pin.owner.name ? <h4 className='text-lg font-medium'>{pin.owner.name}</h4> : ""}
                        <p>{pin?.owner?.follower?.length} followers</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='space-y-4  h-10 mt-10 flex items-center justify-center gap-5 p-4'>
                  {
                    pin?.owner?._id === User?._id ?
                      <button onClick={handleEdit} className="bg-green-600 hover:bg-green-700 text-white font-semibold mt-4 py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Update</button>
                      : ""
                  }
                  {
                    pin?.owner?._id === User?._id ? <button onClick={deletePin} className="bg-red-600  hover:bg-red-700 text-white font-semibold mt-3 py-2 px-4 rounded-full">
                      Delete
                    </button> :
                      <button
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

                  <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="w-full h-10 p-2 pl-5 text-md text-gray-700 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Type comment here...." />
                  <button className='text-red-500 text-2xl mx-[-15px]' onClick={handleComment}><IoSendOutline /></button>
                </div>
              </div>

            </div>
          </div>
      }
      {
        dataloading ? <LoadingAnimation /> :
          <div className="pin-page md:hidden  w-full flex items-center justify-center">
            <div className='flex flex-col w-full max-sm:pb-32  p-4 bg-white max-sm:flex max-sm:flex-col border shadow-lg rounded-3xl md:flex-row'>
              <div className='min-h-[70vh] w-full max-sm:mb-1 object-cover max-sm:h-0 md:w-[60vh]'>
                {
                  pin?.image?.url ? <img src={pin.image.url} alt="" className='rounded-3xl' /> : ""
                }
              </div>
              <div className='flex flex-col max-sm:mt-[-20vh] w-full p-4 md:w-[40vw]'>
                <div className='flex items-end justify-end w-full gap-5 md:w-[40vw]'>
                  <button className="border border-red-600 text-gray-500 font-semibold mt-3 py-2 px-4 rounded-full">Read it</button>
                  <button onClick={saveImage} className="bg-red-600  hover:bg-red-700 text-white font-semibold mt-3 py-2 px-4 rounded-full">Save</button>
                </div>
                <div className="flex flex-col space-y-4 mt-4 max-sm:mt-[-1vh]  p-4 md:ml-0">
                  <div>

                    {
                      edit ? <input type="text" placeholder='Enter Title here' value={title} onChange={(e) => setTitle(e.target.value)} className="w-full h-10 p-2 pl-5 text-md text-gray-700 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600" />
                        : <h1 className="text-5xl max-sm:text-xl font-medium">{pin.title}</h1>
                    }

                    {
                      edit ? <input type="text" placeholder='Enter Pin here' value={upin} onChange={(e) => setPin(e.target.value)} className="w-full h-10 p-2 pl-5 text-md text-gray-700 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600" />
                        : <p className="text-lg text-black max-sm:text-sm font-light pl-1 pt-7">{pin.pin}</p>
                    }

                  </div>
                  <div className='p-2 border border-red-600 w-fit rounded-full'>
                    <p className="text-lg text-black font-light max-sm:text-sm  pl-2 pr-2">tehas </p>
                  </div>
                  <Link to={`/owner/${pin?.owner?._id}`}>
                    <div className='pt-10 flex items-center max-sm:mt-[-30px] gap-2'>
                      <h1 className='border border-red-600 text-3xl h-14 w-14 p-1 flex items-center justify-center rounded-full'>
                        {
                          pin?.owner?.name.slice(0, 1)
                        }
                      </h1>
                      <div className='flex flex-col'>
                        {pin && pin.owner && pin.owner.name ? <h4 className='text-lg font-medium'>{pin.owner.name}</h4> : ""}
                        <p>{pin?.owner?.follower?.length} followers</p>
                      </div>
                    </div>
                  </Link>
                </div>
                <div className='space-y-4  h-10 mt-10 flex items-center max-sm:flex-col justify-center gap-5 p-4 md:justify-end'>
                  <div className='flex  items-center gap-3'>


                    {
                      pin?.owner?._id === User?._id ?
                        <button onClick={handleEdit} className="bg-green-600 hover:bg-green-700 text-white font-semibold mt-4 py-2 px-4 rounded-full transition duration-300 ease-in-out transform hover:scale-105">Update</button>
                        : ""
                    }
                    {
                      pin?.owner?._id === User?._id ? <button onClick={deletePin} className="bg-red-600  hover:bg-red-700 text-white font-semibold mt-3 py-2 px-4 rounded-full">
                        Delete
                      </button> :
                        <button
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
                  <div className="flex items-center gap-5">
                    <input type="text" value={comment} onChange={e => setComment(e.target.value)} className="w-full h-10 p-2 pl-5 text-md text-gray-700 rounded-lg border border-red-300 focus:outline-none focus:ring-2 focus:ring-red-600" placeholder="Type comment here...." />
                    <button className='text-red-500 text-2xl mx-[-15px]' onClick={handleComment}><IoSendOutline /></button>
                  </div>
                </div>
              </div>

            </div>
          </div>
      }
    </>

  )
}

export default Pin_page