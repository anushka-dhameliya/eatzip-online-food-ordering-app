import { Box, Button, Card, CardContent, CardMedia, Dialog, DialogContent, Divider, Grid, IconButton, MenuItem, Select, TextField, Typography } from '@mui/material'
import { pink, grey } from '@mui/material/colors';
import React, { useEffect } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { Field, Form, Formik } from 'formik';
import CloseIcon from '@mui/icons-material/Close';
import { NAME_REGEX } from '../../config/constant';
import * as Yup from 'yup';
import { Image } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { createOffer, getOffersForRestaurant } from '../../State/RestaurantOwner/Restaurant/Action';
import { getMonth } from "../../config/util";


function OfferCard({ offers }) {
  return (

    <div className='flex flex-wrap items-center justify-center gap-5'>
      {
        offers?.map((item) => (
          item.type == "PERCENTAGE" ? (
            <Card elevation={5} sx={{
              backgroundImage: "url('https://media.istockphoto.com/id/821760914/vector/pastel-multi-color-gradient-vector-background-simple-form-and-blend-with-copy-space.jpg?s=612x612&w=0&k=20&c=adwrMs3MkPLXMb69AYSoMpnCfLSAb_D3PCQRGGXiM5g=')",
              backgroundRepeat: "no-repeat",
              height: 130,
              width: 400,
            }}>
              <Grid container spacing={2}>

                <Grid item xs={5}>
                  <Box sx={{ border: 0, borderRadius: '50%' }}>
                    <img style={{ height: '130px' }}
                      src='https://media.istockphoto.com/id/1366714989/vector/burger-with-tomato-and-lettuce-place-next-to-bread-sausages-and-an-orange-soda-can.jpg?s=612x612&w=0&k=20&c=cLaedUjqETgsbU4nQHnTcBg8wUfAb45KswIUTKXzyDM='
                    />
                  </Box>
                </Grid>

                <Grid item xs={7}>
                  <p className='pt-3 text-center font-serif text-xl'>USE  <span className='text-pink-700'><em>{item.name}</em></span></p>
                  <p className='text-6xl text-center font-serif text-rose-400'>{item.percentage}% off</p>
                  <p className='text-xs text-center'>Valid Until {new Date(item.toDate).getDate()} {getMonth(new Date(item.toDate).getMonth())} {new Date(item.toDate).getFullYear()}</p>
                </Grid>

              </Grid>
            </Card>
          ) :
            (
              <Card elevation={5} sx={{
                backgroundImage: "url('https://media.istockphoto.com/id/821760914/vector/pastel-multi-color-gradient-vector-background-simple-form-and-blend-with-copy-space.jpg?s=612x612&w=0&k=20&c=adwrMs3MkPLXMb69AYSoMpnCfLSAb_D3PCQRGGXiM5g=')",
                backgroundRepeat: "no-repeat",
                height: 130,
                width: 400,
              }}>
                <Grid container spacing={2}>

                  <Grid item xs={5}>
                    <Box sx={{ border: 0, borderRadius: '50%' }}>
                      <img style={{ height: '130px' }}
                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcZgywGoSQYjcpaLNmOICVc1O_nb4evtIYUw&s'
                      />
                    </Box>
                  </Grid>

                  <Grid item xs={7}>
                    <p className='pt-3 font-serif text-xl text-center'>USE  <span className='text-pink-700'><em>{item.name}</em></span></p>
                    <p className='text-5xl text-center font-serif text-rose-400'>₹{item.amount} off</p>
                    <p className='text-xs text-center pt-1'>Valid Until {new Date(item.toDate).getDate()} {getMonth(new Date(item.toDate).getMonth())} {new Date(item.toDate).getFullYear()}</p>
                  </Grid>

                </Grid>
              </Card>
            )
        )
        )
      }

    </div>


  );
}

const initialValues = {
  name: "",
  description: "",
  fromDate: "",
  toDate: "",
  type: "",
  percentage: 0.0,
  amount: 0,
  restaurantId: 0
};

const OfferSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too short!')
    .max(30, 'Too long!')
    .required('Required'),
  fromDate: Yup.date()
    .required('Required')
    .min(new Date().toLocaleDateString(), "Invalid Date"),
  toDate: Yup.date()
    .required('Required')
    .min(new Date().toLocaleDateString(), "Invalid Date"),
  type: Yup.string().required('Required'),
  percentage: Yup.number().min(0, 'Invalid Percentage').max(100, 'Invalid Percentage').required('Required'),
  amount: Yup.number().min(0, 'Invalid Amount').required('Required')
});

const RestaurantOffers = () => {

  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  const { restaurant } = useSelector(store => store);

  useEffect(() => {
    if (jwtToken !== null && jwtToken !== undefined) {
      dispatch(getOffersForRestaurant({ jwtToken: jwtToken, restaurantId: restaurant.usersRestaurant?.id }));
    }
  }, [jwtToken, restaurant.usersRestaurant]);


  const [open, setOpen] = React.useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSubmit = (values) => {
    console.log("offer values: ", values);
    let newOffer = {
      name: values.name,
      description: values.description,
      fromDate: new Date(values.fromDate).toISOString(),
      toDate: new Date(values.toDate).toISOString(),
      type: values.type,
      percentage: values.percentage,
      amount: values.amount,
      restaurantId: restaurant.usersRestaurant.id
    };
    dispatch(createOffer({ jwtToken, offerData: newOffer }));
    handleClose();
  }

  return (
    <div className='px-5'>
      <h1 className='text-xl lg:text-4xl text-center pt-10 font-semibold'>
        Offers
      </h1>
      <div className='pb-5 text-center pt-10'>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<AddIcon />}
          style={{ backgroundColor: pink[300], color: 'white' }}
          onClick={handleClickOpen}
        >
          Add New Offer
        </Button>
      </div>
      <div>
        <OfferCard offers={restaurant.restaurantOffers} />
      </div>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        scroll='paper'
        fullWidth='false'
        maxWidth='xs'
      >
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent>
          <div className='pt-3'>
            <Typography variant='h5' className='text-center'>
              New Offer
            </Typography>
            <Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={OfferSchema}>
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="name"
                    label="Name"
                    fullWidth
                    variant="standard"
                    sx={{ mt: 2 }}></Field>
                  {errors.name && touched.name ? (
                    <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.name}</div>
                  ) : null}
                  <Field
                    as={TextField}
                    name="description"
                    label="Description"
                    multiline
                    fullWidth
                    variant="standard"
                    sx={{ mt: 2 }}></Field>
                  <Field
                    as={Select}
                    name="type"
                    label="Type"
                    sx={{ mt: 4 }}
                    variant="standard"
                    fullWidth
                  >
                    <MenuItem value='PERCENTAGE'>Percentage</MenuItem>
                    <MenuItem value='AMOUNT'>Amount</MenuItem>
                  </Field>
                  <Field
                    as={TextField}
                    name="percentage"
                    label="Percentage"
                    fullWidth
                    variant="standard"
                    sx={{ mt: 2 }}></Field>
                  {errors.percentage && touched.percentage ? (
                    <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.percentage}</div>
                  ) : null}
                  <Field
                    as={TextField}
                    name="amount"
                    label="Amount"
                    fullWidth
                    variant="standard"
                    sx={{ mt: 2 }}></Field>
                  {errors.amount && touched.amount ? (
                    <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.amount}</div>
                  ) : null}
                  <Field
                    as={TextField}
                    name="fromDate"
                    label="From Date"
                    fullWidth
                    variant="standard"
                    helperText="MM/DD/YYYY"
                    sx={{ mt: 2 }}></Field>
                  {errors.fromDate && touched.fromDate ? (
                    <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.fromDate}</div>
                  ) : null}
                  <Field
                    as={TextField}
                    name="toDate"
                    label="ToDate"
                    fullWidth
                    variant="standard"
                    helperText="MM/DD/YYYY"
                    sx={{ mt: 2 }}></Field>
                  {errors.toDate && touched.toDate ? (
                    <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.toDate}</div>
                  ) : null}
                  <Button sx={{ mt: 3, padding: '1rem' }} fullWidth type='submit' variant='contained'>Save</Button>
                </Form>
              )}
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RestaurantOffers