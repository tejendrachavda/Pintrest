import React from 'react';
import {  useNavigate } from 'react-router-dom';

function Cart({ pin }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(`/pin/${pin._id}`, { state: { owner: pin.owner } });
  };

  return (
    <button onClick={handleNavigate}>
    <div className="cart">
      <div className="cart group">
        <input type="hidden" name="ownerId" value={pin.owner} />
        <div className="cart-container flex items-center justify-center ">
          <img src={pin.image.url} alt="" className="rounded-2xl relative" />
          {/* <div className='absolute'>
            <button className='px-4  py-2  invisible  group-hover:visible bg-red-600 rounded-lg text-white' onClick={handleNavigate}>show</button>
          </div> */}
        </div>
      </div>
    </div>
    </button>
  )
}

export default Cart