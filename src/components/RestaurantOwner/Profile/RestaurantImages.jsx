import React from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { pink } from '@mui/material/colors';
import { Box, IconButton, ImageList, ImageListItem, Tooltip } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import { uploadImage } from '../../config/UploadImagesToCloudinary';
import { updateRestaurant } from '../../State/RestaurantOwner/Restaurant/Action';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});



const RestaurantImages = () => {

  const dispatch = useDispatch();
  const { restaurant } = useSelector(store => store);
  const jwtToken = localStorage.getItem('jwtToken');

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    const image = await uploadImage(file);
    restaurant.usersRestaurant.images.push(image);
    dispatch(updateRestaurant({ jwtToken, restaurantId: restaurant.usersRestaurant.id, restaurantData: restaurant.usersRestaurant }));
  }

  const handleImageRemove = async (item) => {
    restaurant.usersRestaurant.images = restaurant.usersRestaurant.images.filter(i => i !== item);
    dispatch(updateRestaurant({ jwtToken, restaurantId: restaurant.usersRestaurant.id, restaurantData: restaurant.usersRestaurant }));
  }


  return (
    <div className='items-center'>
      <h1 className='text-xl lg:text-4xl text-center py-7 font-semibold'>
        Restaurant Images
      </h1>
      <div className='text-center'>
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
          style={{ backgroundColor: pink[600], color: 'white' }}
        >
          Upload Images
          <VisuallyHiddenInput
            type="file"
            accept='image/*'
            onChange={(e) => handleImageUpload(e)}
          />
        </Button>
      </div>
      <Box className='m-10'>
        <ImageList variant="masonry" cols={4} gap={8}>
          {restaurant.usersRestaurant?.images.map((item) => (
            <ImageListItem key={item} className='relative' style={{ backgroundColor: '#000000' }}>
              <img
                src={item}
                loading="lazy"
                className='opacity-80'
              />
              <IconButton
                size='small'
                sx={{ position: 'absolute', bottom: 0, right: 0, outline: 'none', color: 'white' }}
                onClick={() => handleImageRemove(item)}>
                <DeleteIcon />
              </IconButton>
            </ImageListItem>
          ))}
        </ImageList>
      </Box>
    </div>
  )
}

export default RestaurantImages