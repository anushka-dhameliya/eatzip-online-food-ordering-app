import { alpha, Checkbox, Chip, Divider, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import { Field, Form, Formik } from 'formik';
import { green, pink } from '@mui/material/colors';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurant, updateRestaurantStatus } from '../../State/RestaurantOwner/Restaurant/Action';
import InputLabel from '@mui/material/InputLabel';
import * as Yup from 'yup';
import { EMAIL_REGEX, NUMBER_REGEX, URL_REGEX } from '../../config/constant';


function RestaurantDetailsForm({ restaurant }) {

  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  let isVegetarian = restaurant?.vegetarian;

  //mode => view, edit, save
  const [mode, setMode] = useState('view');

  const handleDetailsSubmit = (values) => {
    console.log("updated values", values);
    restaurant.description = values.description;
    restaurant.workingHours = values.workingHours;
    restaurant.vegetarian = isVegetarian;
    dispatch(updateRestaurant({ jwtToken, restaurantId: restaurant.id, restaurantData: restaurant }));
    setMode('view');
  }

  const handleEditMode = () => {
    setMode('edit');
  }

  return (
    <div>
      <Formik
        onSubmit={handleDetailsSubmit}
        enableReinitialize
        initialValues={{
          description: restaurant?.description,
          workingHours: restaurant?.workingHours,
          isVegetarian: restaurant?.vegetarian
        }}
      >
        <Form>
          <Field
            as={TextField}
            name="description"
            label="Description"
            variant="standard"
            multiline
            sx={{ mt: 1, width: '100%' }}
            disabled={mode === 'view' ? true : false}
            InputLabelProps={{ shrink: true }}
          //onChange={(e) => restaurant.description = e.target.value}
          ></Field>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={6}>
              <Field
                as={TextField}
                name="workingHours"
                label="Working Hours"
                variant="standard"
                sx={{ width: '90%' }}
                disabled={mode === 'view' ? true : false}
                InputLabelProps={{ shrink: true }}
              ></Field>
            </Grid>
            <Grid item xs={6}>
              <FormControlLabel
                control={
                  <Field
                    component={Switch}
                    type="checkbox"
                    name="isVegetarian"
                    disabled={mode === 'view' ? true : false}
                    defaultChecked={restaurant?.isVegetarian}
                    sx={{
                      mt: 1, color: pink[900],
                      '& .MuiSwitch-switchBase.Mui-checked': {
                        color: pink[600],
                        '&:hover': {
                          backgroundColor: alpha(pink[600], 0.1),
                        },
                      },
                      '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                        backgroundColor: pink[600],
                      },
                    }}
                  />
                }
                label="Vegetarian"
              />
            </Grid>
          </Grid>
          <div className='text-right pt-5'>
            {
              mode === 'view' ?
                (<Chip variant='outlined' style={{ color: pink[600], borderColor: pink[600] }} avatar={<EditIcon style={{ color: pink[600] }} />} onClick={handleEditMode} label="Edit"></Chip>) :
                (<Button type="submit" variant='outlined' style={{ color: green[700], borderColor: green[600] }} startIcon={<SaveIcon />}>Save</Button>)
            }
          </div>
        </Form>
      </Formik>


    </div>
  );
}

function RestaurantOtherDetailsForm({ restaurant }) {
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  const initialOtherDetailsValues = {
    restaurantEmail: restaurant?.contactInformation?.email,
    phoneNo: restaurant?.contactInformation?.phoneNo,
    twitterUrl: restaurant?.contactInformation?.twitterUrl,
    instagramUrl: restaurant?.contactInformation?.instagramUrl,
    youtubeUrl: restaurant?.contactInformation?.youtubeUrl
  };

  //mode => view, edit, save
  const [mode, setMode] = useState('view');

  const handleOtherDetailsSubmit = (values) => {
    console.log("updated values", values);
    restaurant.contactInformation.email = values.restaurantEmail;
    restaurant.contactInformation.phoneNo = values.phoneNo;
    restaurant.contactInformation.twitterUrl = values.twitterUrl;
    restaurant.contactInformation.instagramUrl = values.instagramUrl;
    restaurant.contactInformation.youtubeUrl = values.youtubeUrl;
    dispatch(updateRestaurant({ jwtToken, restaurantId: restaurant.id, restaurantData: restaurant }));
    setMode('view');
  }

  const handleEditMode = () => {
    setMode('edit');
  }

  const RestaurantOtherDetailsSchema = Yup.object().shape({
    restaurantEmail: Yup.string().matches(EMAIL_REGEX, 'Invalid Email'),
    phoneNo: Yup.string().matches(NUMBER_REGEX, 'Invalid Phone number')
      .min(10, 'Invalid Phone number')
      .max(10, 'Invalid Phone number'),
    // twitterUrl: Yup.string().matches(URL_REGEX, 'Invalid URL'),
    // instagramUrl: Yup.string().matches(URL_REGEX, 'Invalid URL'),
    // youtubeUrl: Yup.string().matches(URL_REGEX, 'Invalid URL')
  });

  return (
    <div>
      <Formik onSubmit={handleOtherDetailsSubmit} enableReinitialize initialValues={initialOtherDetailsValues} validationSchema={RestaurantOtherDetailsSchema}>
        {({ errors, touched }) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  type="email"
                  name="restaurantEmail"
                  label="Restaurant Email"
                  variant="standard"
                  sx={{ mt: 2, width: '90%' }}
                  disabled={mode === 'view' ? true : false}
                  InputLabelProps={{ shrink: true }}
                //onChange={(e) => restaurant.contactInformation.email = e.target.value}
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
                  sx={{ mt: 2, width: '90%' }}
                  disabled={mode === 'view' ? true : false}
                  InputLabelProps={{ shrink: true }}
                ></Field>
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
                  sx={{ mt: 2, width: '90%' }}
                  disabled={mode === 'view' ? true : false}
                  InputLabelProps={{ shrink: true }}
                ></Field>
              </Grid>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  name="instagramUrl"
                  label="Instagram"
                  variant="standard"
                  sx={{ mt: 2, width: '90%' }}
                  disabled={mode === 'view' ? true : false}
                  InputLabelProps={{ shrink: true }}
                ></Field>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Field
                  as={TextField}
                  name="youtubeUrl"
                  label="Youtube"
                  variant="standard"
                  sx={{ mt: 2, width: '90%' }}
                  disabled={mode === 'view' ? true : false}
                  InputLabelProps={{ shrink: true }}
                ></Field>
              </Grid>
            </Grid>
            <div className='text-right pt-5'>
              {
                mode === 'view' ?
                  (<Chip variant='outlined' style={{ color: pink[600], borderColor: pink[600] }} avatar={<EditIcon style={{ color: pink[600] }} />} onClick={handleEditMode} label="Edit"></Chip>) :
                  (<Button type="submit" variant='outlined' style={{ color: green[700], borderColor: green[600] }} startIcon={<SaveIcon />}>Save</Button>)
              }
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}


const RestaurantDetails = () => {

  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const { restaurant } = useSelector(store => store);

  const handleOnClickRestaurantStatus = () => {
    dispatch(updateRestaurantStatus({ jwtToken, restaurantId: restaurant.usersRestaurant?.id }));
  }


  return (
    <div className='px-10'>

      <h1 className='text-xl lg:text-4xl text-center pt-10 font-semibold ml-[15vw]'>
        {restaurant.usersRestaurant?.name}
        <Chip
          label={restaurant.usersRestaurant?.open ? "Open" : "Close"}
          color={restaurant.usersRestaurant?.open ? 'success' : 'error'}
          onClick={handleOnClickRestaurantStatus}
          sx={{ fontSize: '1rem', ml: 2 }} />
      </h1>

      <div className='space-y-5 w-full lg:w-[90vw] pt-12 pb-10 pl-10'>
        <Paper
          elevation={3}
          sx={{
            padding: '2rem',
            borderRadius: '3px'
          }}>
          <p className='font-semibold text-xl'>Details</p>
          <Divider className='p-2' />
          <div className='pt-5'>
            <RestaurantDetailsForm restaurant={restaurant.usersRestaurant} />
          </div>
        </Paper>
        <Paper
          elevation={3}
          sx={{
            padding: '2rem',
            borderRadius: '3px'
          }}>
          <p className='font-semibold text-xl'>Other Details</p>
          <Divider className='p-2' />
          <div className='pt-5'>
            <p className='font-semibold'>Address : </p>
            <p>{restaurant.usersRestaurant?.address.addressLine1}, {restaurant.usersRestaurant?.address.addressLine2}, {restaurant.usersRestaurant?.address.street}, {restaurant.usersRestaurant?.address.city}, {restaurant.usersRestaurant?.address.state}, {restaurant.usersRestaurant?.address.pinCode}</p>
            <RestaurantOtherDetailsForm restaurant={restaurant.usersRestaurant} />
          </div>
        </Paper>
      </div>

    </div>
  )
}

export default RestaurantDetails