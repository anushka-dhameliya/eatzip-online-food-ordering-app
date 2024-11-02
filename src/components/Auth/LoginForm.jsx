import { Button, IconButton, Input, InputAdornment, TextField } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup'
import { loginUser } from '../State/Authentication/Action';
import { EMAIL_REGEX } from '../config/constant';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SignInSchema = Yup.object().shape({
    email: Yup.string()
        .matches(EMAIL_REGEX, "Invalid Email address")
        .required('Required'),
    password: Yup.string()
        .required('Required')
});


const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = (values) => {
        dispatch(loginUser({ userData: values, navigate }));
        console.log(values);
    }

    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: SignInSchema,
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
                    sx={{ mt: 2 }}
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
                    sx={{ mt: 2 }}
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        onMouseUp={handleMouseUpPassword}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        },
                    }}
                    variant="standard"
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    error={formik.touched.password && Boolean(formik.errors.password)}
                    helperText={formik.touched.password && formik.errors.password}
                />
                <Button
                    className="bg-gradient-to-r from-pink-900 to-pink-600 hover:animate-bounce"
                    sx={{ mt: '3rem', padding: '1rem', color: 'white', borderRadius : '10px' }}
                    fullWidth
                    type='submit'
                    variant='contained'
                >
                    <p className='text-white text-lg font-semibold'>Login</p>
                </Button>

            </form>
            <p className='text-center mt-5 text-sm'>
                Don't have an account?
                <Button className='pl-3' size='small' onClick={() => navigate("/account/register")}>
                    <p className='text-pink-900'>Sign Up</p>
                </Button>
            </p>
        </div>
    )
}

export default LoginForm