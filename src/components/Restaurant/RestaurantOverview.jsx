import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailIcon from '@mui/icons-material/Email';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import PhoneIcon from '@mui/icons-material/Phone';
import { Button, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';


const RestaurantOverview = ({ restaurant }) => {
    return (
        <div>
            <section>
                <p className='text-2xl'>
                    Address:
                    <Typography variant='body1'>
                        {restaurant?.address.addressLine1},  {restaurant?.address.addressLine2}, {restaurant?.address.street},  {restaurant?.address.city},  {restaurant?.address.state},   {restaurant?.address.pinCode}
                    </Typography>
                </p>
            </section>
            <section className='pt-5'>
                <p className='text-2xl'>Contact Details : </p>
                <p className='pt-3'><PhoneIcon /> +91 {restaurant?.contactInformation.phoneNo}</p>
                <p className='pt-3'><EmailIcon /> {restaurant?.contactInformation.email}</p>
                <p className='pt-5'>
                    <Button size="large" startIcon={<InstagramIcon />} sx={{ color: pink[900], minWidth: 0 }} />
                    <Button size="large" startIcon={<TwitterIcon />} sx={{ color: pink[900], minWidth: 0 }} />
                    <Button size="large" startIcon={<YouTubeIcon />} sx={{ color: pink[900], minWidth: 0 }} />
                </p>
            </section>
        </div>
    )
}

export default RestaurantOverview