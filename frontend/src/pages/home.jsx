import React, { useEffect } from 'react'
import Cart from '../components/cart'
import { Pin } from '../context/PinContext'
import { LoadingAnimation } from '../components/loding';
import Masonry from '@mui/lab/Masonry';

function Home() {
  const { allpins , pins, dataloading } = Pin();

  useEffect(() =>{
    allpins    
  },[  dataloading ])

  return (
    <div className='p-5 flex gap-5 flex-wrap md:p-10 lg:p-10'>
      <Masonry columns={{ xs: 2, sm: 2, md: 3, lg: 4 }} spacing={2} className='flex flex-wrap'>

        {
          dataloading ? <div><LoadingAnimation /></div> : pins.map((pin, index) => (
            <div key={index}>
              <div className=" shadow-xl rounded-3xl">
                <Cart pin={pin} />
              </div>
            </div>
          ))
        }
      </Masonry>
    </div>
  )
}

export default Home