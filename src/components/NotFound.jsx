import React from 'react'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='flex flex-col  justify-center items-center'>
        <div className='w-250 mt-0 '>
       <DotLottieReact
      src="https://lottie.host/efa48b48-d0be-46eb-93ea-2c304af79d6c/HluLiuyv3h.lottie"
      loop
      autoplay
    />
    </div>
    <Link to={"/"}>
    <button className='cursor-pointer'>
       Go Back to Home
    </button>
    </Link>
    </div>
  )
}

export default NotFound
