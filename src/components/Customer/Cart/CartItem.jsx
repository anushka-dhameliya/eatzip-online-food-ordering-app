import React from 'react'
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Button, Chip, IconButton } from '@mui/material';
import { removeCartItem, updateCartItemQuantity } from '../../State/Customer/Cart/Action';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';

const CartItem = ({ item }) => {
    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem("jwtToken");
    var [totalAmount, setTotalAmount] = React.useState(item.totalAmount);

    let quantity = item.quantity;
    let singleItemAmount = Math.round(item.totalAmount / item.quantity);

    const handleIncreaseQuantity = () => {
        quantity = quantity + 1;
        setTotalAmount(totalAmount + singleItemAmount);
        updateItemQuantity();
    }

    const handleDecreaseQuantity = () => {
        if (quantity - 1 > 0) {
            quantity = quantity - 1;
            setTotalAmount(totalAmount - singleItemAmount);
            updateItemQuantity();
        }
        else if (quantity - 1 == 0) {
            removeItem();
        }
    }

    const updateItemQuantity = () => {
        dispatch(updateCartItemQuantity({ jwtToken: jwtToken, cartItemId: item.id, quantity: quantity }));
    }

    const removeItem = () => {
        dispatch(removeCartItem({ jwtToken: jwtToken, cartItemId: item.id }));
    }

    return (
        <div className='px-5'>
            <div className='lg:flex items-center lg:space-x-5'>
                <div>
                    <img className='w-[5rem] h-[5rem] object-cover'
                        src={item.menuItem.images[0]} />
                </div>
                <div className='flex items-center justify-between lg:w-[70%]'>
                    <div className='space-y-1 lg:space-x-3 w-full'>
                        <p>{item.menuItem.name}</p>
                        <div className='flex justify-between items-center'>
                            <div className='flex items-center space-x-1'>
                                <IconButton>
                                    <RemoveCircleOutlineIcon onClick={handleDecreaseQuantity} />
                                </IconButton>
                                <div className='w-5 h-5 text-xs flex items-center justify-center'>{quantity}</div>
                                <IconButton><AddCircleOutlineIcon onClick={handleIncreaseQuantity} /></IconButton>
                                <IconButton aria-label="delete" size="large">
                                    <DeleteIcon onClick={removeItem} />
                                </IconButton>
                            </div>
                        </div>
                    </div>
                    <p>₹{totalAmount}</p>
                </div>
            </div>
            <div className='pt-3 space-x-2'>
                {item.addOnItems?.map((addOnItem) => <Chip label={addOnItem?.name} />)}
            </div>
        </div>
    )
}

export default CartItem