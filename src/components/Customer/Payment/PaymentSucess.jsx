import { Button, Card } from '@mui/material'
import { pink } from '@mui/material/colors'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'

const PaymentSucess = () => {

    const navigate = useNavigate();
    const { id } = useParams();

    return (
        <div className='min-h-screen px-5'>
            <div className='flex flex-col items-center justify-center h-[90vh]'>
                <Card
                    elevation={5}
                    className='box w-full lg:w-1/3 flex flex-col items-center rounded-md p-5'>
                    <img
                        src="https://img.freepik.com/premium-vector/transfer-money-concept-illustration_86047-117.jpg?semt=ais_siglip"
                    />
                    <h1 className='py-5 text-2xl font-semibold'>Payment Successful!</h1>
                    <p className='py-3 text-center text-gray-400'>Your transaction was completed successfully. Thank you for the order.</p>
                    <Button
                        className=""
                        sx={{ mt: '1rem', color: 'white', borderRadius: '10px', backgroundColor: pink[400] }}
                        type='submit'
                        variant='contained'
                        onClick={() => navigate("/user/my-profile/orders")}
                    >
                        <p className='text-white font-semibold'>My Orders</p>
                    </Button>
                </Card>
            </div>
        </div>
    )
}

export default PaymentSucess