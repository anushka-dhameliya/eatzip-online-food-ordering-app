import React, { useEffect } from 'react'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Logout from '@mui/icons-material/Logout';
import { Avatar, Button, Card, CardHeader, TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser, logout, updateUserDetails } from '../State/Authentication/Action';
import { pink } from '@mui/material/colors';
import { Edit } from '@mui/icons-material';
import { uploadImage } from '../config/UploadImagesToCloudinary';
import { NAME_REGEX, NUMBER_REGEX } from '../config/constant'
import styled from 'styled-components';
import * as Yup from 'yup';
import { useFormik } from 'formik';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});


const UserSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too short!')
        .required('Required')
        .matches(NAME_REGEX, 'Only Characters'),
    phoneNumber: Yup.string()
        .matches(NUMBER_REGEX, 'Invalid Phone number')
        .min(10, 'Invalid Phone number')
        .max(10, 'Invalid Phone number')
        .required('Required')
});

const UserProfile = () => {

    const { auth } = useSelector(store => store);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('jwtToken');

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        const image = await uploadImage(file);
        auth.user.profileImageUrl = image;
        dispatch(updateUserDetails({ jwtToken, userDetails: auth.user }));
    }

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            fullName: auth.user?.fullName,
            email: auth.user?.email,
            phoneNumber: auth.user?.phoneNumber
        },
        validationSchema: UserSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    const handleSubmit = (values) => {
        const userDetails = {
            id: auth.user.id,
            fullName: values.fullName,
            email: auth.user.email,
            phoneNumber: values.phoneNumber,
            isUserLocked: auth.user.isUserLocked,
            profileImageUrl: auth.user.profileImageUrl
        }
        dispatch(updateUserDetails({ jwtToken, userDetails: userDetails }));
    }

    return (
        <div className='pt-[3rem] pl-[20rem] pb-[2rem]'>
            <Card
                elevation={5}
                sx={{
                    width: '40rem',
                    height: '35rem'
                }}>
                <div className='p-[2rem]'>
                    <p className='text-black text-2xl font-bold'>My Account</p>
                    <div className='pt-[2rem] flex flex-row'>
                        {
                            auth.user?.profileImageUrl !== null && auth.user?.profileImageUrl !== undefined && auth.user?.profileImageUrl != '' ?
                                (
                                    <Avatar
                                        src={auth.user.profileImageUrl}
                                        sx={{ width: 100, height: 100 }}
                                    />
                                ) :
                                (
                                    <AccountCircleIcon sx={{ width: 100, height: 100 }} />
                                )
                        }
                        <Button
                            component="label"
                            variant="outlined"
                            tabIndex={-1}
                            startIcon={<Edit />}
                            style={{ color: 'black', marginLeft: '1rem', marginTop: '4rem', border: 'none' }}
                        >

                            <VisuallyHiddenInput
                                type="file"
                                accept='image/*'
                                onChange={(e) => handleImageUpload(e)}
                            />
                        </Button>
                    </div>

                    <div className='pt-[2rem]'>
                        <form onSubmit={formik.handleSubmit} >
                            <TextField
                                fullWidth
                                variant="standard"
                                sx={{ mt: 1 }}
                                id="fullName"
                                name="fullName"
                                label="Full Name"
                                value={formik.values.fullName}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.fullName && Boolean(formik.errors.fullName)}
                                helperText={formik.touched.fullName && formik.errors.fullName}
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                variant="standard"
                                sx={{ mt: 1 }}
                                id="email"
                                name="email"
                                label="Email"
                                value={formik.values.email}
                                disabled
                                InputLabelProps={{ shrink: true }}
                            />
                            <TextField
                                fullWidth
                                sx={{ mt: 1 }}
                                name="phoneNumber"
                                label="Phone Number"
                                variant="standard"
                                value={formik.values.phoneNumber}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
                                helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
                                InputLabelProps={{ shrink: true }}
                            />
                            <Button
                                className="bg-gradient-to-r from-pink-900 to-pink-600"
                                sx={{ mt: '3rem', padding: '1rem', color: 'white', borderRadius: '10px' }}
                                fullWidth
                                type='submit'
                                variant='contained'
                            >
                                <p className='text-white text-lg font-semibold'>Save Changes</p>
                            </Button>

                        </form>
                    </div>
                </div>
            </Card>
        </div>
    )
}

export default UserProfile