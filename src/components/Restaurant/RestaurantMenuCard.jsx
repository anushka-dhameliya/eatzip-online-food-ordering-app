import React from 'react'
import { Button, Card, IconButton, TableContainer, Table, TableCell, Paper, TableBody, TableRow, Accordion, AccordionSummary, AccordionDetails, Grid } from '@mui/material'
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { pink } from '@mui/material/colors';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addItemToCart, clearCart, removeCartItem, updateCartItemQuantity } from '../State/Customer/Cart/Action';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

const RestaurantMenuCard = ({ menuItem, addOnItems, IsPresentInCart, Quantity, CartItemId }) => {

    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    var [addOnItemsSelected, setAddOnItemsSelected] = React.useState([]);
    var [totalValue, setTotalValue] = React.useState(menuItem.price);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem("jwtToken");
    const role = localStorage.getItem("role");
    const { auth, cart } = useSelector(store => store);


    //add-on items selected
    //var addOnItemsSelected = [];

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCheckBoxItemClick = (event) => {
        let id = event.target.value;
        for (let i = 0; i < addOnItems.length; i++) {
            if (addOnItems[i].id == id) {
                if (event.target.checked) {
                    setTotalValue(totalValue + addOnItems[i].price);
                    addOnItemsSelected.push(id)
                    setAddOnItemsSelected(addOnItemsSelected);
                }
                else {
                    setTotalValue(totalValue - addOnItems[i].price);
                    setAddOnItemsSelected(addOnItemsSelected.filter(i => i !== id));
                }
                break;
            }
        }
        console.log("totalValue : ", totalValue);
    }

    //check if items can be added to cart, if cart already has item from another restaurant
    const [errorOpen, setErrorOpen] = React.useState(false);

    const handleErrorClickOpen = () => {
        setErrorOpen(true);
    };

    const handleErrorClose = () => {
        setErrorOpen(false);
    };

    const handleAddItemToCart = () => {
        if (cart.cartItems?.length > 0) {
            if (cart.cartItems[0].menuItem.restaurant.id !== menuItem.restaurant.id) {
                handleErrorClickOpen();
            }
            else {
                addItems();
            }
        }
        else {
            addItems();
        }

    }

    const handleContinue = () => {
        dispatch(clearCart({ jwtToken: jwtToken, userId: auth.user.id }));
        handleErrorClose();
        addItems();
    }

    //add item to cart
    const addItems = () => {
        Quantity = Quantity + 1;
        let selectedAddOnItems = [];
        for (let i = 0; i < addOnItemsSelected.length; i++) {
            selectedAddOnItems.push(addOnItems.filter(j => j.id == addOnItemsSelected[i])[0]);
        }
        const cartItemData = {
            menuItem: menuItem,
            addOnItems: selectedAddOnItems,
            quantity: Quantity,
            totalAmount: totalValue
        };

        dispatch(addItemToCart({ jwtToken: jwtToken, cartItemData: cartItemData }));
        navigate("/user/cart");
    }

    //increase quantity of item
    const handleIncreaseQuantity = () => {
        Quantity = Quantity + 1;
        totalValue = totalValue + Math.round(totalValue / Quantity);
        updateItemQuantity();

    }

    const handleDecreaseQuantity = () => {
        if (Quantity - 1 >= 1) {
            Quantity = Quantity - 1;
            totalValue = totalValue - Math.round(totalValue / Quantity);
            updateItemQuantity();
        }
        else if (Quantity - 1 == 0) {
            removeItem();
        }
    }

    const updateItemQuantity = () => {
        dispatch(updateCartItemQuantity({ jwtToken: jwtToken, cartItemId: CartItemId, quantity: Quantity }));
    }

    const removeItem = () => {
        dispatch(removeCartItem({ jwtToken: jwtToken, cartItemId: CartItemId }));
    }

    return (

        <>
            <div>
                <Card className='lg:w-[50rem] h-[7rem] cursor-pointer'>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <img style={{ width: '7rem', height: '7rem' }} src={menuItem.images[0]} />
                        </Grid>
                        <Grid item xs={8}>
                            <div className='px-1 py-3'>
                                <p>
                                    <img className='w-3 pb-1' src={menuItem.vegetarian ? 'https://openclipart.org/image/800px/304248' : 'https://freesvg.org/img/1531813245.png'} />
                                </p>
                                <p>{menuItem.name}</p>
                                <p className='text-xs truncate'>
                                    {menuItem?.description}
                                </p>
                                <p className='text-slate-950 pt-2 pb-2'>₹{menuItem?.price}</p>
                            </div>
                        </Grid>
                        <Grid item xs={2}>
                            <div className='mt-[4rem] ml-[3rem]'>
                                {IsPresentInCart ?
                                    (
                                        <div className='mt-[4rem]'>
                                            <div className='flex items-center'>
                                                <IconButton>
                                                    <RemoveCircleOutlineIcon onClick={handleDecreaseQuantity} />
                                                </IconButton>
                                                <p className='w-5 h-5 flex items-center justify-center font-semibold'>{Quantity}</p>
                                                <IconButton>
                                                    <AddCircleOutlineIcon onClick={handleIncreaseQuantity} />
                                                </IconButton>
                                            </div>
                                        </div>
                                    ) :
                                    (
                                        <Button type="submit"
                                            style={{
                                                color: '#e91e63',
                                                borderColor: '#e91e63',
                                                fontSize: '0.7rem',
                                                width: '2rem',
                                                height: '2rem',
                                            }} variant="outlined"
                                            onClick={handleClickOpen}
                                        >
                                            Add
                                        </Button>
                                    )
                                }
                            </div>
                        </Grid>
                    </Grid>
                </Card>
            </div>


            <React.Fragment>
                <Dialog
                    fullWidth={fullWidth}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="responsive-dialog-title"
                >
                    <DialogTitle id="responsive-dialog-title">
                        {""}
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
                        {menuItem.description != '' ? (
                            <div className='pb-5'>
                                <Accordion>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1-content"
                                        id="panel1-header"
                                    >
                                        Description
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <p className='text-sm'>{menuItem?.description}</p>
                                    </AccordionDetails>
                                </Accordion>
                            </div>
                        ) :
                            (<div></div>)
                        }

                        <div className='pb-3 text-xl'>
                            <h1>Customize?</h1>
                        </div>
                        <DialogContentText>

                            <div className=''>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                        <TableBody>
                                            {addOnItems.map((item => item.inStock &&
                                                (

                                                    <TableRow
                                                        sx={{ border: 'none' }}
                                                        className='pt-0.5'
                                                    >
                                                        <TableCell sx={{ border: 'none' }} align="left">{item.name}</TableCell>
                                                        <TableCell sx={{ border: 'none' }} align="right">+ ₹{item.price}</TableCell>
                                                        <TableCell className='w-5' sx={{ border: 'none' }} align="right"><FormControlLabel
                                                            control={
                                                                <Checkbox
                                                                    name={item.id}
                                                                    value={item.id}
                                                                    sx={{
                                                                        color: pink[800],
                                                                        '&.Mui-checked': {
                                                                            color: pink[600],
                                                                        },
                                                                    }}
                                                                    onClick={(e) => handleCheckBoxItemClick(e)}
                                                                />
                                                            }
                                                            label=""
                                                        ></FormControlLabel>
                                                        </TableCell>
                                                    </TableRow>

                                                )
                                            ))}
                                            <TableRow sx={{ border: 'none' }}>
                                                <TableCell className='w-15' sx={{ border: 'none' }} align="right">
                                                    Total : ₹ {totalValue}
                                                </TableCell>
                                                <TableCell />
                                                <TableCell />
                                                <TableCell />
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                            <div>
                                {
                                    jwtToken !== null && jwtToken !== undefined ? (<p></p>) :
                                        (<p className='text-left pt-3 text-sm text-red-500 font-semibold'>Login to add item to Cart**</p>)
                                }

                                <p className='text-end pt-5'>
                                    {jwtToken !== null && jwtToken !== undefined ?
                                        (
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                style={{ color: 'white', backgroundColor: '#e91e63' }}
                                                onClick={handleAddItemToCart}
                                            >
                                                Add Item to Cart
                                            </Button>
                                        ) :
                                        (
                                            <Button
                                                disabled
                                                style={{ color: 'white', backgroundColor: '#f48fb1' }}
                                                variant="contained"
                                            >
                                                Add Item to Cart
                                            </Button>
                                        )
                                    }
                                </p>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>
            </React.Fragment>
            <React.Fragment>
                <Dialog
                    open={errorOpen}
                    onClose={handleErrorClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Error"}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Cart already has items from different restaurant. Do you want to clear and add new items?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button style={{ color: 'white', backgroundColor: '#f48fb1' }} onClick={handleErrorClose}>No</Button>
                        <Button style={{ color: 'white', backgroundColor: '#f48fb1' }} onClick={handleContinue}>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        </>
    )
}

export default RestaurantMenuCard