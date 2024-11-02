import React from 'react'
import "./Auth.css";
import { Box, Card } from '@mui/material';
import LoginForm from './LoginForm';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('jwtToken');

    if(jwtToken !== null && jwtToken !== undefined && jwtToken != ''){
        navigate("/");
    }

    return (
        <Box className='loginBanner bg-gradient-to-r from-pink-200 to-pink-100' sx={{
            position: 'absolute',
            width: "100%",
            height: "89.9%"
        }}>
            <>
                <Card
                    elevation={5}
                    className='relative top-[2rem] left-[15rem] w-[65%] h-[90%]'
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
                                    Welcome Back
                                </p>
                                <span className='text-xs text-gray-500'>
                                    Sign in with your email address and password.
                                </span>
                            </div>
                            <LoginForm />
                        </div>
                        <div className='p-[1rem]'>
                            <img
                                style={{
                                    width: "35rem",
                                    height: "30rem"
                                }}
                                src="https://img.freepik.com/free-photo/fruit-salad-spilling-floor-was-mess-vibrant-colors-textures-generative-ai_8829-2895.jpg?semt=ais_hybrid"
                            />
                        </div>
                    </div>
                </Card>
            </>
        </Box>
    )
}

export default Login