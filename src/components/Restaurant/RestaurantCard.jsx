import { Card, Chip,Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();
    const handleOnClick = () => {
        if (restaurant.open === true)
            navigate(`/restaurant/${restaurant.address.city}/${restaurant.name}/${restaurant.id}`);
    }
    return (
        <Card className='w-[15rem] hover:scale-95' onClick={handleOnClick} sx={{ height: '20rem' }}>
            <div className={`${restaurant.open ? 'cursor-pointer' : 'cursor-not-allowed'} relative`}>
                <img className='w-full h-[10rem] rounded-t-md object-cover'
                    src={restaurant?.images[0]}></img>
                <Chip size='small' className='absolute top-2 left-2'
                    color={restaurant.open ? "success" : "error"}
                    label={restaurant.open ? "Open" : "Close"}>
                </Chip>
            </div>
            <div className='p-4 textPart lg:flex w-full justify-between'>
                <div className='space-y-1'>
                    <p className='text-black'>{restaurant.name}</p>
                    <p className='text-gray-600 text-xs'>
                        <Typography variant='caption' sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            display: '-webkit-box',
                            WebkitLineClamp: '2',
                            WebkitBoxOrient: 'vertical'
                        }}
                        >
                            {restaurant.description}
                        </Typography>
                    </p>
                    <p className='text-black text-xs pt-2'>
                        {restaurant.address.city}, {restaurant.address.state}
                    </p>
                </div>
            </div>
        </Card>
    )
}

export default RestaurantCard