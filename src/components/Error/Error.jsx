import React from 'react'
import { useNavigate } from 'react-router-dom';

const Error = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-row ml-48 text-center'>
      <section className=''>
        <img className='w-[35rem] h-[35rem]'
          src="https://img.freepik.com/premium-vector/404-error-with-women-pointing-warning-banner_82574-11161.jpg?ga=GA1.1.539807931.1728920501&semt=ais_hybrid-rr-similar"
        />
      </section>
      <section className=''>
        <div className='pt-[15rem] text-center pl-5'>
          <p className='italic text-6xl'>Page Not Found</p>
          <p className='pt-5'>
            Oops! Looks like you followed a bad link.
          </p>
        </div>
      </section>
    </div>
  )
}

export default Error