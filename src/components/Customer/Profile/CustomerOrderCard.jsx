import React from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Accordion, AccordionDetails, AccordionSummary, Card, Chip, Dialog, DialogContent, DialogContentText, DialogTitle, Divider, Grid, Stack, Tooltip, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { DELIVERY_FEE, GST_AND_RESTAURANT_PERCENT_CHARGES, PLATFORM_FEE } from '../../config/constant';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { getPaymentReceiptUrl } from '../../State/Customer/Order/Action';

function OrderTable({ orders }) {

    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem("jwtToken");


    const [open, setOpen] = React.useState(false);
    const [orderData, setOrderData] = React.useState({});

    const handleClickOpen = (order) => {
        setOpen(true);
        setOrderData(order);
    };

    const handleClose = () => {
        setOpen(false);
        setOrderData({});
    };


    const handleViewReceipt = (orderId) => {
        dispatch(getPaymentReceiptUrl({ jwtToken, orderId: orderId }));
    }

    return (
        <>
            {
                orders.map((item) => (
                    <div className='pl-10 pb-5 w-[50rem]'>
                        <Card elevation={5} style={{
                            padding: '1.5rem',
                            borderRadius: '10px',
                            width: '100%'
                        }}>
                            <div>
                                <Grid container spacing={0}>
                                    <Grid item xs={3}>
                                        <img
                                            className='w-[10rem] h-[6.5rem]'
                                            src={item.restaurant.images[0]} />
                                    </Grid>
                                    <Grid item xs={6}>
                                        <div className='space-y-1'>
                                            <p className='font-semibold text-sm'>{item.restaurant.name}</p>
                                            <p className='text-sm'>{item.restaurant.address.city}, {item.restaurant.address.state}</p>
                                            <p className='text-sm'>#ORDER_{item.id}</p>
                                            <p className='text-xs pt-5 text-pink-600 space-x-5 cursor-pointer'>
                                                <span onClick={() => handleClickOpen(item)}>View Details</span>
                                                <span onClick={() => handleViewReceipt(item.id)}>View Receipt</span>
                                            </p>
                                        </div>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <div className='pl-5'>
                                            <p className='text-center'>
                                                <Chip
                                                    label={item.orderStatus}
                                                    sx={
                                                        item.orderStatus == 'NEW' ? {
                                                            color: 'white',
                                                            backgroundColor: '#b39ddb'
                                                        } :
                                                            item.orderStatus == 'ACCEPTED' ? {
                                                                color: 'white',
                                                                backgroundColor: '#0d47a1'
                                                            } :
                                                                item.orderStatus == 'COMPLETE' ?
                                                                    {
                                                                        color: 'white',
                                                                        backgroundColor: '#81c784'
                                                                    } :
                                                                    item.orderStatus == 'DELIVERED' ? {
                                                                        color: 'white',
                                                                        backgroundColor: '#1b5e20'
                                                                    } :
                                                                        item.orderStatus == 'PAYMENT_FAILED' ? {
                                                                            color: 'white',
                                                                            backgroundColor: '#ff9800'
                                                                        } :
                                                                            {
                                                                                color: 'white',
                                                                                backgroundColor: '#b71c1c'
                                                                            }
                                                    }
                                                />
                                            </p>
                                            <p className='text-xs pt-2 text-center'>
                                                <AccessTimeIcon sx={{ width: '1rem', height: '1rem', marginRight: '0.2rem' }} />
                                                {new Date(item.orderDate).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </Grid>
                                </Grid>
                                <Divider variant='middle' className='p-2' />
                                <div className='pt-3'>
                                    {
                                        item.orderItems?.map((i) => (
                                            <p className='text-xs'>
                                                {i.menuItem.name}   <span className='font-semibold ml-2 mr-2'>x</span>   {i.quantity}
                                            </p>
                                        ))
                                    }
                                </div>
                            </div>
                        </Card>
                    </div>
                ))
            }


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll='paper'
                fullWidth='true'
                maxWidth='md'
            >
                <DialogTitle id="alert-dialog-title">
                    {"Order Details"}
                </DialogTitle>
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
                <DialogContent dividers>
                    <DialogContentText id="alert-dialog-description">
                        <p>
                            <CheckCircleOutlineIcon sx={{ color: '#15803d' }} />
                            <span className='ml-1 font-semibold'>
                                Ordered
                            </span>
                        </p>
                        <p className='pt-2'>
                            <AccessTimeIcon />
                            <span className='ml-2'>
                                {new Date(orderData.orderDate).toLocaleString()}
                            </span>
                        </p>
                        <Divider className='p-2' variant='middle' />
                        <p className='pt-5 pb-3 text-xl'>Order Items</p>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ maxWidth: 150 }}></TableCell>
                                        <TableCell align='center' style={{ maxWidth: 120 }}>Name</TableCell>
                                        <TableCell align='center' style={{ maxWidth: 150 }}>Add-Ons</TableCell>
                                        <TableCell align='center' style={{ maxWidth: 50 }}>Quantity</TableCell>
                                        <TableCell align='center' style={{ maxWidth: 100 }}>Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        orderData.orderItems?.map((item) =>
                                        (
                                            <TableRow>
                                                <TableCell>
                                                    <img className='w-[5rem] h-[5rem] object-cover'
                                                        src={item.menuItem.images[0]} />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {item.menuItem.name}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <Stack spacing={1}>
                                                        {item.addOnItems?.map(i => (<p><Chip label={i.name} /></p>))}
                                                    </Stack>
                                                </TableCell>
                                                <TableCell align='center'>{item.quantity}</TableCell>
                                                <TableCell align='center'>{item.totalAmount}</TableCell>
                                            </TableRow>
                                        )
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <p className='pt-3 pb-3'></p>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >Bill Details
                            </AccordionSummary>
                            <AccordionDetails>
                                <div className='space-y-2'>
                                    <div className='flex justify-between text-gray-500'>
                                        <p>Item Total : </p>
                                        <p>₹{orderData.totalAmount}</p>
                                    </div>
                                    <div className='flex justify-between text-gray-500'>
                                        <p>Delivery Fee : </p>
                                        <p>₹{DELIVERY_FEE}</p>
                                    </div>
                                    <div className='flex justify-between text-gray-500'>
                                        <p>GST and Restaurant Charges : </p>
                                        <p>₹{Math.round(orderData.totalAmount * GST_AND_RESTAURANT_PERCENT_CHARGES / 100)}</p>
                                    </div>
                                    <div className='flex justify-between text-gray-500'>
                                        <p>Platform Fee : </p>
                                        <p>₹{PLATFORM_FEE}</p>
                                    </div>
                                    {
                                        (orderData.offer !== null ?
                                            (orderData.offer?.type == 'PERCENTAGE' ? (
                                                <div className='flex justify-between text-gray-500'>
                                                    <p>Offer Discount : </p>
                                                    <p className='text-pink-900'>{orderData.offer?.name}</p>
                                                    <p>- ₹{orderData.totalAmount * Math.round((100 - orderData.offer?.percentage) / 100)}</p>
                                                </div>
                                            )
                                                :
                                                <div className='flex justify-between text-gray-500'>
                                                    <p>Offer Discount : </p>
                                                    <p className='text-pink-900'>{orderData.offer?.name}</p>
                                                    <p>- ₹{orderData.offer?.amount}</p>
                                                </div>)
                                            : ''
                                        )
                                    }

                                    <Divider />
                                </div>
                                <div className='pt-3 flex justify-between text-gray-500'>
                                    <p>Total :</p>
                                    <p>₹
                                        {
                                            orderData.totalAmount
                                            + DELIVERY_FEE
                                            + Math.round(orderData.totalAmount * GST_AND_RESTAURANT_PERCENT_CHARGES / 100)
                                            + PLATFORM_FEE
                                            - (orderData.offer !== null ?
                                                (orderData.offer?.type == 'PERCENTAGE' ? (orderData.totalAmount * Math.round((100 - orderData.offer?.percentage) / 100))
                                                    : orderData.offer?.amount)
                                                : 0
                                            )
                                        }
                                    </p>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                        <p className='pt-3 pb-3'></p>
                        <Accordion>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1-content"
                                id="panel1-header"
                            >Delivery Address
                            </AccordionSummary>
                            <AccordionDetails>
                                {orderData.deliveryAddress?.addressLine1},  {orderData.deliveryAddress?.addressLine2 !== null ? orderData.deliveryAddress?.addressLine2.toString().concat(",") : ''}  {orderData.deliveryAddress?.street}, {orderData.deliveryAddress?.city},  {orderData.deliveryAddress?.state},  {orderData.deliveryAddress?.pinCode}
                            </AccordionDetails>
                        </Accordion>
                    </DialogContentText>
                </DialogContent>
            </Dialog>
        </>
    )
}

const CustomerOrderCard = ({ orders }) => {

    return (
        <>
            <OrderTable orders={orders} />
        </>
    )
}

export default CustomerOrderCard