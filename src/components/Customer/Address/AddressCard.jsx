import { Button, Card, Chip } from '@mui/material'
import React, { useState } from 'react'

const AddressCard = ({ item, showButton, handleSelectAddress, isSelected }) => {

    const [isSelctedAddress, setIsSelctedAddress] = useState(false);
    if (isSelected !== null && isSelected !== undefined && isSelected.id == item.id) {
        setIsSelctedAddress(true);
    }
    return (
        <Card className='flex gap-5 w-[20rem] h-[8rem] p-5'
            sx={isSelctedAddress ? {
                border: '2px solid #db2777'
            }
                :
                {
                    border: 'none'
                }}
        >
            <div className='text-gray-500'>
                <h1 className='font-semibold text-lg text-black'>{item.name} - {item.type}</h1>
                <p className='text-sm mt-2'>{item.addressLine1}, {item.addressLine2 !== null && item.addressLine2 !== undefined && item.addressLine2 != '' ? item.addressLine2.toString().concat(",") : ''} {item.street}</p>
                <p className='text-sm'>{item.city}, {item.state}, {item.pinCode}</p>
                {showButton && (
                    <Chip
                        label={isSelctedAddress ? (<p className='font-semibold text-[0.7rem] text-pink-600'>Select</p>) : (<p className='font-semibold text-[0.7rem] text-white'>Selected</p>)}
                        variant='contained'
                        sx={{
                            left: '14rem',
                            height: '1.5rem',
                            backgroundColor: isSelctedAddress ? 'white' : '#db2777',
                            border: '1px solid #db2777'
                        }}
                        onClick={() => {
                            handleSelectAddress(item);
                        }}
                    />
                )}
            </div>
        </Card>
    )
}

export default AddressCard