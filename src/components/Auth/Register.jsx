import React from 'react'
import RegisterForm from './RegisterForm'
import "./Auth.css";
import { Box, Card} from '@mui/material';

const Register = () => {
    return (
        <Box className='loginBanner' sx={{
            position: 'absolute',
            width: "100%",
            height: "120%"
        }}>
            <>
                <Card
                    elevation={5}
                    className='relative top-[2rem] left-[11rem] w-[75%] h-[92%]'
                    sx={{
                        backgroundColor: 'white',
                        borderRadius : '10px'
                    }}
                >
                    <div className='flex flex-row'>

                        <div className='p-[2rem]'>
                            <div class="text-2xl font-extrabold">
                                <p className='rooster-font text-4xl font-light'>EatZip</p>
                            </div>
                            <div>
                                <p className='font-semibold text-3xl pt-4'>
                                    Hello There.
                                </p>
                                <span className='text-xs text-gray-500'>
                                    Sign up to continue.
                                </span>
                            </div>
                            <RegisterForm />
                        </div>
                        <div className='p-[1rem]'>
                            <img
                            style={{
                                width: "95rem",
                                height: '41.5rem'
                            }}
                            src="https://img.freepik.com/free-photo/pre-prepared-food-showcasing-ready-eat-delicious-meals-go_23-2151431710.jpg?semt=ais_hybrid"
                        />
                        </div>
                    </div>
                </Card>
            </>
        </Box>
    )
}

export default Register