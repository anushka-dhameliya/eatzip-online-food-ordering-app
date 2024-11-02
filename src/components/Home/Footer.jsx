import { Typography } from '@mui/material'
import React from 'react'

const Footer = () => {
    return (
        <footer>
            <section className='mt-10 py-5 text-center items-center justify-center text-pink-900' style={{ backgroundColor: "#831843" }}>
                <div className='text-white items-center justify-center text-center h-2'>
                    <Typography variant='body2'>Designed By <span className='font-semibold pl-1 font-serif'>Anushka Dhameliya</span></Typography>
                </div>
            </section>
        </footer>
    )
}

export default Footer