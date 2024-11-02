import { Avatar, Box, Button, Card, CardContent, CardMedia, Chip, Container, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Table, TableBody, TableCell, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import CartItem from './CartItem'
import AddressCard from '../Address/AddressCard';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import AddNewAddressCard from '../Address/AddNewAddressCard';
import SendIcon from '@mui/icons-material/Send';
import './Button.css';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useDispatch, useSelector } from 'react-redux';
import { getCartByUserId } from '../../State/Customer/Cart/Action';
import { DELIVERY_FEE, GST_AND_RESTAURANT_PERCENT_CHARGES, PLATFORM_FEE } from '../../config/constant';
import CloseIcon from '@mui/icons-material/Close';
import { pink } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';
import { getAvialableOffersForRestaurant, getOffersForRestaurant } from '../../State/Customer/Restaurant/Action';
import { getUserAddresses } from '../../State/Customer/Address/Action';
import { createOrder } from '../../State/Customer/Order/Action';
import LocationOnIcon from '@mui/icons-material/LocationOn';


function CartItems({ cartItems, addresses, offers }) {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const jwtToken = localStorage.getItem('jwtToken');

    const [devlieryAddress, setDevlieryAddress] = useState(null);

    const createOrderUsingSelectedAddress = (value) => {
        console.log("selected address : ", value);
        setDevlieryAddress(value);
    }

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [applyState, setApplyState] = useState("Apply");
    const [appliedOffer, setAppliedOffer] = useState(null);

    const handleOnApplyOffer = (offer) => {
        setApplyState("Applied");
        setOpen(false);
        setAppliedOffer(offer);
    }
    const handleOnRemoveOffer = () => {
        setApplyState("Apply");
        setAppliedOffer(null);
    }


    const [isHovered, setIsHovered] = useState(false);

    let totalAmount = 0;

    for (let i = 0; i < cartItems.length; i++) {
        totalAmount = totalAmount + cartItems[i].totalAmount;
    }

    const handlePlaceOrder = () => {
        let order = {
            deliveryAddress: devlieryAddress,
            restaurant: cartItems[0].menuItem.restaurant,
            offer: appliedOffer,
        };
        console.log("order data: ", order);
        dispatch(createOrder({ jwtToken, orderData: order }));
    }

    return (
        <div>
            <main className='lg:flex justify-between'>

                <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-3'>

                    <div className='px-7'>
                        <Grid container>
                            <Grid item spacing={5}>
                                <p className='text-center justify-center'>
                                    <Avatar src={cartItems[0].menuItem.restaurant.images[0]} sx={{ width: 56, height: 56 }} />
                                </p>
                            </Grid>
                            <Grid item spacing={7}>
                                <div className='px-5 pt-2'>
                                    <p className='font-semibold text-xl'>
                                        {cartItems[0].menuItem.restaurant.name}
                                    </p>
                                    <p className='text-xs text-gray-600'>
                                        {cartItems[0].menuItem.restaurant.address.city} , {cartItems[0].menuItem.restaurant.address.state}, {cartItems[0].menuItem.restaurant.address.pinCode}
                                    </p>
                                </div>
                            </Grid>
                        </Grid>
                    </div>

                    <Divider/>

                    {cartItems.map((item) => <CartItem item={item} />)}

                    <div>
                        <Button variant='contained' className='left-[6.25rem]' 
                        style={{ color: 'white', backgroundColor: '#e91e63' }} 
                        onClick={() => navigate(`/restaurant/${cartItems[0].menuItem.restaurant.address.city}/${cartItems[0].menuItem.restaurant.name}/${cartItems[0].menuItem.restaurant.id}`)}>
                            Browse More Items
                        </Button>
                    </div>

                    {offers.length > 0 ?
                        (

                            <div>
                                <Button variant='contained' className='left-28' style={{ color: 'white', backgroundColor: '#e91e63' }} onClick={handleClickOpen}>
                                    Available Offers
                                </Button>
                            </div>

                        ) :
                        (<></>)
                    }


                    <Divider />
                    <div className='billDetails px-5 text-sm'>
                        <p className='font-extralight py-5 text-slate-900'>Bill Details</p>
                        <div className='space-y-2'>
                            <div className='flex justify-between text-gray-500'>
                                <p>Item Total : </p>
                                <p>₹{totalAmount}</p>
                            </div>
                            <div className='flex justify-between text-gray-500'>
                                <p>Delivery Fee : </p>
                                <p>₹{DELIVERY_FEE}</p>
                            </div>
                            <div className='flex justify-between text-gray-500'>
                                <p>GST and Restaurant Charges : </p>
                                <p>₹{Math.round(totalAmount * GST_AND_RESTAURANT_PERCENT_CHARGES / 100)}</p>
                            </div>
                            <div className='flex justify-between text-gray-500'>
                                <p>Platform Fee : </p>
                                <p>₹{PLATFORM_FEE}</p>
                            </div>
                            {
                                (appliedOffer !== null ?
                                    (appliedOffer.type == 'PERCENTAGE' ? (
                                        <div className='flex justify-between text-gray-500'>
                                            <p>Offer Discount : </p>
                                            <p className='text-pink-900'>{appliedOffer.name}</p>
                                            <p>- ₹{totalAmount * Math.round((100 - appliedOffer.percentage) / 100)}</p>
                                        </div>
                                    )
                                        :
                                        <div className='flex justify-between text-gray-500'>
                                            <p>Offer Discount : </p>
                                            <p className='text-pink-900'>{appliedOffer.name}</p>
                                            <p>- ₹{appliedOffer.amount}</p>
                                        </div>
                                    )
                                    : ''
                                )
                            }
                            <Divider />
                        </div>
                        <div className='pt-3 flex justify-between text-gray-500'>
                            <p>Total :</p>
                            <p>₹
                                {
                                    totalAmount
                                    + DELIVERY_FEE
                                    + Math.round(totalAmount * GST_AND_RESTAURANT_PERCENT_CHARGES / 100)
                                    + PLATFORM_FEE
                                    - (appliedOffer !== null ?
                                        (appliedOffer.type == 'PERCENTAGE' ? (totalAmount * Math.round((100 - appliedOffer.percentage) / 100))
                                            : appliedOffer.amount)
                                        : 0
                                    )
                                }
                            </p>
                        </div>
                    </div>
                </section>
                <Divider orientation='vertical' flexItem />
                <section className='lg:w-[70%] flex px-5 pb-10 lg:pb-0'>
                    <div>
                        <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
                        <div className='flex gap-5 flex-wrap justify-start'>
                            {addresses?.map((item) =>
                            (
                                <Card className='flex gap-5 w-[20rem] h-[6.5rem] p-5'
                                    sx={devlieryAddress !== null && devlieryAddress !== undefined && devlieryAddress.id == item.id ? { border: '2px solid #ec407a' } : { border: 'none' }}
                                    onClick={() => {
                                        createOrderUsingSelectedAddress(item);
                                    }}
                                >
                                    <div className='text-gray-500'>
                                        <h1 className='font-semibold text-lg text-black'>{item.name} - {item.type}</h1>
                                        <p className='text-xs mt-2'>{item.addressLine1}, {item.addressLine2 !== null && item.addressLine2 !== undefined && item.addressLine2 != '' ? item.addressLine2.toString().concat(",") : ''} {item.street}</p>
                                        <p className='text-xs'>{item.city}, {item.state}, {item.pinCode}</p>
                                    </div>
                                </Card>
                            )
                            )}
                            <AddNewAddressCard />
                        </div>
                    </div>
                    <div className='bottom-0 right-10 absolute'>
                        <Button className={`animated-button ${isHovered ? 'hovered' : ''}`}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)} variant="contained" endIcon={<SendIcon />}
                            onClick={handlePlaceOrder}
                            style={{
                                color: 'white',
                                backgroundColor: "#db2777"
                            }}>
                            Place Order
                        </Button>
                    </div>
                </section>
            </main>

            <React.Fragment>
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                    fullWidth="true"
                    maxWidth="sm"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Available Offers for Restaurant"}
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
                            {offers.map(item => (
                                <div className='pb-5 pt-2'>
                                    <Grid container
                                        spacing={2}
                                        sx={applyState == "Applied" && appliedOffer !== null && appliedOffer.name == item.name ? {
                                            border: 1,
                                            borderRadius: '16px',
                                            borderColor: '#4caf50',
                                            borderLeftStyle: 'solid',
                                            borderLeftWidth: '0.1em',
                                            bordeRightStyle: 'solid',
                                            borderRightWidth: '0.1em',
                                            borderTopStyle: 'solid',
                                            borderTopWidth: '0.1em',
                                            bordeBottomStyle: 'solid',
                                            borderBottomWidth: '0.1em'
                                        } :
                                            {
                                                border: 1,
                                                borderRadius: '16px',
                                                borderColor: '#bbdefb',
                                                borderLeftStyle: 'solid',
                                                borderLeftWidth: '0.1em',
                                                bordeRightStyle: 'solid',
                                                borderRightWidth: '0.1em'
                                            }
                                        }
                                        className='pb-2'>
                                        <Grid item xs={2}>
                                            <img src='https://media.istockphoto.com/id/1531894249/vector/discount-coupon-icon-vector-linear-editable-sign-of-vouchers-symbolizing-sales-offer-and.jpg?s=612x612&w=0&k=20&c=-POYDK4au3H-WorE5niEtvxwRfp_-RU_dW2bVHKCWps='
                                                width="50" height="100"
                                            />
                                        </Grid>
                                        <Grid item xs={7}>
                                            <p className='font-semibold'>{item.name}</p>
                                            <p className='font-light'>(- {item.type == 'PERCENTAGE' ? item.percentage.toString().concat("%") : "₹".concat(item.amount.toString())})</p>
                                        </Grid>
                                        <Grid item xs={3} className='items-center justify-center'>
                                            {
                                                applyState == "Applied" ?
                                                    appliedOffer !== null && appliedOffer.name == item.name ?
                                                        (
                                                            <Tooltip title="Remove">
                                                                <Chip className='mt-1 ml-10 cursor-pointer' style={{ color: 'white', backgroundColor: '#4caf50' }} label="Applied" onClick={handleOnRemoveOffer} />
                                                            </Tooltip>
                                                        ) :
                                                        (
                                                            <Tooltip title="Apply Offer">
                                                                <Chip className='mt-1 ml-10 cursor-pointer' disabled="true" style={{ color: 'white', backgroundColor: '#1e88e5' }} label="Apply" onClick={() => handleOnApplyOffer(item)} />
                                                            </Tooltip>
                                                        )
                                                    :
                                                    (

                                                        <Tooltip title="Apply Offer">
                                                            <Chip className='mt-1 ml-10 cursor-pointer' style={{ color: 'white', backgroundColor: '#1e88e5' }} label="Apply" onClick={() => handleOnApplyOffer(item)} />
                                                        </Tooltip>
                                                    )
                                            }

                                        </Grid>
                                    </Grid>
                                </div>
                            ))}
                        </DialogContent>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
        </div>
    );
}

function EmptyCart() {
    return (
        <div
            style={{
                position: 'absolute',
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)'
            }}
        >
            <img
                src="https://media.istockphoto.com/id/861576608/vector/empty-shopping-bag-icon-online-business-vector-icon-template.jpg?s=612x612&w=0&k=20&c=I7MbHHcjhRH4Dy0NVpf4ZN4gn8FVDnwn99YdRW2x5k0="
                alt=""
                width={500} height={250}
            />
            <Typography variant="h4" className='text-center text-slate-600'>
                Your Cart is <span className='text-red-800'><em>Empty</em></span>.
            </Typography>
        </div>
    );
}

const Cart = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();


    const jwtToken = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("role");

    if (role !== 'ROLE_CUSTOMER') {
        navigate("/error");
    }

    const { auth, cart, restaurantCustomer, addressCustomer } = useSelector(store => store);

    useEffect(() => {
        if (jwtToken !== null && jwtToken !== undefined) {
            dispatch(getCartByUserId({ jwtToken: jwtToken, userId: auth.user?.id }));
            dispatch(getUserAddresses({ jwtToken }));
        }
        if (jwtToken !== null && jwtToken !== undefined && cart.cartItems?.length > 0) {
            dispatch(getAvialableOffersForRestaurant({ jwtToken: jwtToken, restaurantId: cart.cartItems[0].menuItem.restaurant.id }));
        }

    }, [jwtToken, auth.user, cart.cartItems]);

    return (
        <>
            {cart.cartItems?.length > 0 ? (
                <CartItems cartItems={cart.cartItems} addresses={addressCustomer?.usersAddress} offers={restaurantCustomer.availableRestarantOffers} />
            ) : (
                <EmptyCart />
            )
            }
        </>
    )
}

export default Cart