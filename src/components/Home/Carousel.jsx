import React from 'react'
import { useNavigate } from 'react-router-dom';

const Carousel = ({ image, title }) => {

  const navigate = useNavigate();

  const handleOnclick = () => {
    navigate(`/restaurant/search?category=${title}`);
  }
  return (
    <div className='flex flex-col justify-center items-center'>
      <img className='w-[8rem] h-[8rem]
        rounded-full object-cover object-center cursor-pointer' src={image} onClick={handleOnclick}></img>
      <span className='py-5 font-semibold '>{title}</span>
    </div>
  )
}

export default Carousel