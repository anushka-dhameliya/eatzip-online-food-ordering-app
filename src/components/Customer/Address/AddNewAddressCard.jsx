import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { pink } from '@mui/material/colors';
import { Box, Button, Card, Grid, Grid2, IconButton, MenuItem, Select, TextField, Tooltip } from '@mui/material';
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { cityStateList } from "../../config/cityStateList";
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'react-redux';
import { createAddress } from '../../State/Customer/Address/Action';

const AddNewAddressCard = () => {

    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem('jwtToken');

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (value) => {
        console.log(value);
        dispatch(createAddress({ jwtToken, addressData: value }));
    }

    const validationSchema = Yup.object().shape({
        name: Yup.string().required("Address Name is required."),
        addressLine1: Yup.string().required("Address Line 1 is required."),
        street: Yup.string().required("Street is required."),
        city: Yup.string().required("City is required."),
        state: Yup.string().required("State is required."),
        pinCode: Yup.string().required("Pincode is required.")
    });

    const initialValues = {
        name: "",
        type: "",
        addressLine1: "",
        addressLine2: "",
        street: "",
        city: "",
        state: "",
        pinCode: ""
    }

    return (
        <Box className='flex gap-5 p-5' sx={{ border: 0 }}>
            <div className='space-y-3 text-gray-500 ml-16'>

                <Tooltip title="Add New Address">
                    <IconButton>
                        <AddIcon
                            style={{ backgroundColor: "#e91e63", color: 'white', fontSize: 50 }}
                            sx={{ borderRadius: '50%' }}
                            onClick={handleClickOpen} />
                    </IconButton>
                </Tooltip>
            </div>

            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Add New Address"}
                    </DialogTitle>
                    <IconButton
                        aria-label="close"
                        onClick={handleClose}
                        sx={() => ({
                            position: 'absolute',
                            right: 8,
                            top: 8,
                            color: pink[500],
                        })}
                    ><CloseIcon /></IconButton>
                    <DialogContent>
                        <DialogContent id="alert-dialog-description">
                            <Formik
                                validationSchema={validationSchema}
                                initialValues={initialValues}
                                onSubmit={handleSubmit}
                            >
                                {({ errors, touched }) => (
                                    <Form>

                                        <Field
                                            as={Select}
                                            name="type"
                                            label="Type"
                                            fullWidth
                                            variant="standard"
                                        >
                                            <MenuItem value="Home">Home</MenuItem>
                                            <MenuItem value="Office">Office</MenuItem>
                                            <MenuItem value="Other">Other</MenuItem>
                                        </Field>

                                        <Field
                                            as={TextField}
                                            name="name"
                                            label="Name"
                                            fullWidth
                                            variant="standard"
                                            sx={{ mt: 1 }}
                                        ></Field>
                                        {errors.name && touched.name ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.name}</div>
                                        ) : null}

                                        <Field
                                            as={TextField}
                                            name="addressLine1"
                                            label="Address Line 1"
                                            fullWidth
                                            variant="standard"
                                            sx={{ mt: 1 }}
                                        ></Field>
                                        {errors.addressLine1 && touched.addressLine1 ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.addressLine1}</div>
                                        ) : null}

                                        <Field
                                            as={TextField}
                                            name="addressLine2"
                                            label="addressLine2"
                                            fullWidth
                                            variant="standard"
                                            sx={{ mt: 1 }}
                                        ></Field>

                                        <Field
                                            as={TextField}
                                            name="street"
                                            label="Street"
                                            fullWidth
                                            variant="standard"
                                            sx={{ mt: 1 }}
                                        ></Field>
                                        {errors.street && touched.street ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.street}</div>
                                        ) : null}

                                        <Field
                                            as={Select}
                                            name="city"
                                            label="City"
                                            fullWidth
                                            variant="standard"
                                            sx={{ mt: 3 }}
                                        >
                                            {cityStateList.map((item) => (<MenuItem value={item.city}>{item.city}</MenuItem>))}
                                        </Field>
                                        {errors.city && touched.city ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.city}</div>
                                        ) : null}

                                        <Field
                                            as={Select}
                                            name="state"
                                            label="State"
                                            fullWidth
                                            variant="standard"
                                            sx={{ mt: 3 }}
                                        >
                                            {cityStateList.map((item) => (<MenuItem value={item.state}>{item.state}</MenuItem>))}
                                        </Field>
                                        {errors.state && touched.state ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.state}</div>
                                        ) : null}

                                        <Field
                                            as={TextField}
                                            name="pinCode"
                                            label="Pincode"
                                            fullWidth
                                            variant="standard"
                                            sx={{ mt: 1 }}
                                        ></Field>
                                        {errors.pinCode && touched.pinCode ? (
                                            <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.pinCode}</div>
                                        ) : null}

                                        <div className='text-center'>
                                            <Button sx={{ mt: 5 }} variant='contained' color="primary" type='submit'>Deliver Here</Button>
                                        </div>

                                    </Form>
                                )}

                            </Formik>
                        </DialogContent>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        </Box>

    )
}

export default AddNewAddressCard