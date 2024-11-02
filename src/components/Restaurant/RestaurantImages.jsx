import React from 'react'
import Box from '@mui/material/Box';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';

const RestaurantImages = ({ restaurant }) => {
  return (
    <Box sx={{ minHeight : 450, paddingBottom : 10 }}>
      <ImageList variant="masonry" cols={4} gap={8}>
        {restaurant?.images.map((item) => (
          <ImageListItem key={item}>
            <img
              src={item}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  )
}

export default RestaurantImages