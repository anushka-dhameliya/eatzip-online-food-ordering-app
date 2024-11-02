import { Button, Card } from '@mui/material'
import { pink } from '@mui/material/colors'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const PaymentError = () => {
    const navigate = useNavigate();
  return (
    <div className='min-h-screen px-5'>
        <div className='flex flex-col items-center justify-center h-[90vh]'>
            <Card 
            elevation={5} 
            className='box w-full lg:w-1/3 flex flex-col items-center rounded-md p-5'>
                <img
                src = "https://img.freepik.com/premium-vector/payment-error-info-message_773186-1133.jpg?semt=ais_siglip"
                />
                <h1 className='py-5 text-2xl font-semibold'>Payment Failed!</h1>
                <p className='py-3 text-center text-gray-400'>Your transaction has failed due to technical error. Please try again.</p> 
            </Card>
        </div>
    </div>
  )
}

export default PaymentError