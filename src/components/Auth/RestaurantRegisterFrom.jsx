import React from 'react'
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Field, Form, Formik } from 'formik';
import { Checkbox, FormControlLabel, Grid, MenuItem, Select, TextField } from '@mui/material';
import { pink } from '@mui/material/colors';
import { cityStateList, stateList } from '../config/cityStateList';
import * as Yup from 'yup'
import { EMAIL_REGEX, NAME_REGEX, NUMBER_REGEX } from '../config/constant';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registerRestaurant } from '../State/RestaurantOwner/Restaurant/Action';



const initialRestaurantDetailsValues = {
    name: "",
    description: "",
    workingHours: "",
    isVegetarian: "",
    addressLine1: "",
    addressLine2: "",
    street: "",
    pinCode: "",
    city: "",
    state: "",
    restaurantEmail: "",
    phoneNo: "",
    twitterUrl: "",
    instagramUrl: "",
    youtubeUrl: ""
};

const RestaurantDetailsSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too short!')
        .max(30, 'Too long!')
        .required('Required')
        .matches(NAME_REGEX, 'Only Characters'),
    addressLine1: Yup.string().required('Required'),
    pinCode: Yup.string()
        .matches(NUMBER_REGEX, 'Only Digits')
        .min(6, 'Must contain 6 digits')
        .max(6, 'Must contain 6 digits')
        .required('Required'),
    city: Yup.string().required('Required'),
    restaurantEmail: Yup.string().matches(EMAIL_REGEX, 'Invalid Email'),
    phoneNo: Yup.string().matches(NUMBER_REGEX, 'Invalid Phone number')
        .min(10, 'Invalid Phone number')
        .max(10, 'Invalid Phone number'),
    state: Yup.string().required('Required')
});


const RestaurantRegisterFrom = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRestaurantDetailsSubmit = (values) => {

        const jwtToken = localStorage.getItem("jwtToken");
        const restaurantDetails = {
            name: values.name,
            description: values.description,
            isOpen: true,
            workingHours: values.workingHours,
            isVegetarian: values.isVegetarian !== null && values.isVegetarian !== undefined ? values.isVegetarian : false,
            address: {
                type: "Restaurant Address",
                name: "Restaurant Address",
                addressLine1: values.addressLine1,
                addressLine2: values.addressLine2,
                street: values.street,
                city: values.city,
                state: values.state,
                pinCode: values.pinCode
            },
            contactInformation: {
                email: values.restaurantEmail,
                phoneNo: values.phoneNo,
                twitterUrl: values.twitterUrl,
                instagramUrl: values.instagramUrl,
                youtubeUrl: values.youtubeUrl
            }
        }
        console.log("restaurantDetails : ", restaurantDetails);
        if (jwtToken !== null && jwtToken !== undefined) {
            try {
                dispatch(registerRestaurant({ restaurantData: restaurantDetails, navigate }));
                console.log("Restaurant registered successfully");
            }
            catch (err) {
                console.log("Restaurant Details Form Error : ", err);
            }
        }
    }

    return (
        <Box className='items-center object-cover mt-5 ml-4 pl-10 pr-0.5 pt-3' sx={{ width: '90%' }}>
            <h1 className='text-center font-bold pb-5 pl-10' style={{ fontSize: '1.5rem' }}>Restaurant Registration</h1>
            <Typography>
                <div className=''>
                    <Formik onSubmit={handleRestaurantDetailsSubmit} initialValues={initialRestaurantDetailsValues} validationSchema={RestaurantDetailsSchema}>
                        {({ errors, touched }) => (
                            <Form>
                                <h1 className='pt-3 font-bold'>Main Details</h1>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="name"
                                            label="Restaurant Name"
                                            variant="standard"
                                            sx={{ width: '90%' }}></Field>
                                        {errors.name && touched.name ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.name}</div>
                                        ) : null}
                                    </Grid>
                                </Grid>

                                <Field
                                    as={TextField}
                                    name="description"
                                    label="Description"
                                    variant="standard"
                                    multiline
                                    sx={{ mt: 1, width: '100%' }}></Field>

                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="workingHours"
                                            label="Working Hours"
                                            variant="standard"
                                            sx={{ width: '90%' }}></Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <FormControlLabel
                                            label="Vegetarian"
                                            className='mt-5 ml-3'
                                            control={
                                                <Field
                                                    component={Checkbox}
                                                    type="checkbox"
                                                    name="isVegetarian"
                                                    label='Vegetarian'
                                                    sx={{
                                                        mt: 1, color: pink[900],
                                                        '&.Mui-checked': {
                                                            color: pink[600],
                                                        },
                                                    }}></Field>
                                            }
                                        />
                                    </Grid>
                                </Grid>


                                <h1 className='pt-3 font-bold'>Address Details</h1>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="addressLine1"
                                            label="Address Line 1"
                                            variant="standard"
                                            sx={{ width: '90%' }}
                                        ></Field>
                                        {errors.addressLine1 && touched.addressLine1 ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.addressLine1}</div>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="addressLine2"
                                            label="Address Line2"
                                            variant="standard"
                                            sx={{ width: '90%' }}></Field>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="street"
                                            label="Street"
                                            variant="standard"
                                            sx={{ width: '90%' }}></Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="pinCode"
                                            label="Pincode"
                                            variant="standard"
                                            sx={{ width: '90%' }}></Field>
                                        {errors.pinCode && touched.pinCode ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.pinCode}</div>
                                        ) : null}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2} sx={{ mt: 1 }}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={Select}
                                            labelId="city-label-id"
                                            name="city"
                                            label="City"
                                            sx={{ width: '90%' }}
                                            variant="standard"
                                        >
                                            {cityStateList.map((item) => (<MenuItem value={item.city}>{item.city}</MenuItem>))}
                                        </Field>
                                        {errors.city && touched.city ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.city}</div>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={Select}
                                            name="state"
                                            label="State"
                                            sx={{ width: '90%' }}
                                            variant="standard"
                                        >
                                            {stateList.map((item) => (<MenuItem value={item}>{item}</MenuItem>))}
                                        </Field>
                                        {errors.state && touched.state ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.state}</div>
                                        ) : null}
                                    </Grid>
                                </Grid>


                                <h1 className='pt-5 font-bold'>Other Details</h1>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            type="email"
                                            name="restaurantEmail"
                                            label="Restaurant Email"
                                            variant="standard"
                                            sx={{ mt: 2, width: '90%' }}
                                        ></Field>
                                        {errors.restaurantEmail && touched.restaurantEmail ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.restaurantEmail}</div>
                                        ) : null}
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="phoneNo"
                                            label="Restaurant Phone Number"
                                            variant="standard"
                                            sx={{ mt: 2, width: '90%' }}></Field>
                                        {errors.phoneNo && touched.phoneNo ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.phoneNo}</div>
                                        ) : null}
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="twitterUrl"
                                            label="Twitter"
                                            variant="standard"
                                            sx={{ mt: 2, width: '90%' }}></Field>
                                    </Grid>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="instagramUrl"
                                            label="Instagram"
                                            variant="standard"
                                            sx={{ mt: 2, width: '90%' }}></Field>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={6}>
                                        <Field
                                            as={TextField}
                                            name="youtubeUrl"
                                            label="Youtube"
                                            variant="standard"
                                            sx={{ mt: 2, width: '90%' }}></Field>
                                    </Grid>
                                </Grid>
                                <Box sx={{ mb: 2 }}>
                                    <Button
                                        variant="contained"
                                        sx={{ mt: 5, mr: 1 }}
                                        type="submit"
                                        style={{ backgroundColor: pink[600], color: 'white' }}
                                    >
                                        Register
                                    </Button>
                                </Box>
                            </Form>
                        )}
                    </Formik>
                </div>
            </Typography>
        </Box>
    )
}

export default RestaurantRegisterFrom