import { Button, FormControl, FormHelperText, MenuItem, Select, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { registerUser } from '../State/Authentication/Action';
import { EMAIL_REGEX, NAME_REGEX, NUMBER_REGEX, PASSWORD_REGEX } from '../config/constant';

const initialValues = {
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: ""
};

const SignUpSchema = Yup.object().shape({
    fullName: Yup.string()
        .min(2, 'Too short!')
        .required('Required')
        .matches(NAME_REGEX, 'Only Characters'),
    email: Yup.string()
        .matches(EMAIL_REGEX, "Invalid Email address")
        .required('Required'),
    password: Yup.string().matches(
        PASSWORD_REGEX,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    ).required('Required'),
    phoneNumber: Yup.string()
        .matches(NUMBER_REGEX, 'Invalid Phone number')
        .min(10, 'Invalid Phone number')
        .max(10, 'Invalid Phone number')
        .required('Required'),
    confirmPassword: Yup.string()
        .oneOf([Yup.ref('password'), null], 'Password must watch')
        .required('Required'),
    role: Yup.string().required('Required')
});

const RegisterForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(registerUser({ userData: values, navigate }));
        console.log(values);
    }

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: SignUpSchema,
        onSubmit: (values) => {
            handleSubmit(values);
        },
    });

    return (
        <div className='pt-5'>
            <form onSubmit={formik.handleSubmit}>
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
                />
                <TextField
                    fullWidth
                    variant="standard"
                    sx={{ mt: 1 }}
                    id="email"
                    name="email"
                    label="Email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                />
                <TextField
                    fullWidth
                    sx={{ mt: 1 }}
                    name="password"
                    label="Password"
                    type={'password'}
                    variant="standard"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <TextField
                    fullWidth
                    sx={{ mt: 1 }}
                    name="confirmPassword"
                    label="Confirm Password"
                    type={'password'}
                    variant="standard"
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                    helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
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
                />
                <FormControl fullWidth sx={{ mt: 3 }} className='text-black' size="small">
                    <Select
                        name="role"
                        label="Role"
                        variant="standard"
                        value={formik.values.role}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.role && Boolean(formik.errors.role)}
                        helperText={formik.touched.role && formik.errors.role}
                    >
                        <MenuItem value="ROLE_CUSTOMER">Customer</MenuItem>
                        <MenuItem value="ROLE_RESTAURANT_OWNER">Restaurant Owner</MenuItem>
                    </Select>
                    <FormHelperText>Role</FormHelperText>
                </FormControl>
                <Button
                    className="bg-gradient-to-r from-pink-900 to-pink-600 hover:animate-bounce"
                    sx={{ mt: '3rem', padding: '1rem', color: 'white', borderRadius : '10px' }}
                    fullWidth
                    type='submit'
                    variant='contained'
                >
                    <p className='text-white text-lg font-semibold'>Sign Up</p>
                </Button>

            </form>
            <p className='text-center mt-5 text-sm'>
                Already have an account?
                <Button className='pl-3' size='small' onClick={() => navigate("/account/login")}>
                <p className='text-pink-900'>Sign In</p>
                </Button>
            </p>
        </div>
    )
}

export default RegisterForm