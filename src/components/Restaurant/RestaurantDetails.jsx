import { Breadcrumbs, Button, Grid2, Link, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import RestaurantMenu from './RestaurantMenu';
import RestaurantOverview from './RestaurantOverview';
import RestaurantImages from './RestaurantImages';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { getAddOnItemsByRestaurantId, getAllMenuCategoriesForRestaurant, getMenuItemsByRestaurantId, getOffersForRestaurant, getRestaurantById } from '../State/Home/Action';
import RestaurantDeals from './RestaurantDeals';

function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const RestaurantDetails = () => {

    const [value, setValue] = React.useState(1);

    const handleChange = (event, newValue) => {
        console.log("image click");
        setValue(newValue);
    };

    const { home } = useSelector(store => store);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();

    useEffect(() => {
        dispatch(getRestaurantById({ restaurantId: id }));
        dispatch(getAllMenuCategoriesForRestaurant({ restaurantId: id }));
        dispatch(getMenuItemsByRestaurantId({ restaurantId: id }));
        dispatch(getAddOnItemsByRestaurantId({ restaurantId: id }));
        dispatch(getOffersForRestaurant({ restaurantId: id }));
    }, []);

    return (
        <div className='px-5 lg:px-20'>
            <section>
                <div className='text-slate-900 py-2 mt-10 cursor-pointer'>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" color="inherit" onClick={() => navigate("/")}>
                            Home
                        </Link>
                        <Link
                            underline="hover"
                            color="inherit"
                            onClick={() => {
                                localStorage.setItem("searchRestaurantsInCity", home.restaurant?.address.city);
                                navigate(`/restaurant/search?city=${home.restaurant?.address.city}`);
                            }
                            }
                        >
                            {home.restaurant?.address.city}
                        </Link>
                        <Typography sx={{ color: 'text.primary' }}>{home.restaurant?.name}</Typography>
                    </Breadcrumbs>
                </div>
                <div>
                    <Grid2 container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
                        <Grid2 item size={{ xs: 2, sm: 4, md: 4 }} lg={6}>
                            <img src={home.restaurant?.images[0]}
                                className='w-full h-[40vh] object-cover ' />
                        </Grid2>
                        <Grid2 item size={{ xs: 2, sm: 4, md: 4 }} lg={6}>
                            <img src={home.restaurant?.images[1]}
                                className='w-full h-[40vh] object-cover ' />
                        </Grid2>
                        {home.restaurant?.images.length > 2 ? (
                            <Grid2 item size={{ xs: 2, sm: 4, md: 4 }} lg={6}>
                                <div className='relative' style={{ backgroundColor: '#000000' }}>
                                    <img src={home.restaurant?.images[2]}
                                        className='w-full h-[40vh] object-cover opacity-50' />
                                    <Button
                                        variant='outlined'
                                        sx={{
                                            position: 'absolute',
                                            bottom: 5,
                                            right: 5,
                                            outline: 'none',
                                            border: '1px solid white',
                                            color: 'white'
                                        }}
                                        onClick={(e) => {
                                            const element = document.getElementById('restaurant-images');
                                            element?.scrollIntoView({
                                                behavior: 'smooth'
                                            });
                                            handleChange(e, 3);
                                        }
                                        }
                                    >View More</Button>
                                </div>
                            </Grid2>
                        ) : (
                            <Grid2 item size={{ xs: 2, sm: 4, md: 4 }} lg={6}>
                                <img src={home.restaurant?.images[2]}
                                    className='w-full h-[40vh] object-cover ' />
                            </Grid2>
                        )}

                    </Grid2>
                </div>
                <div className='pt-3 pb-5'>
                    <h1 className='text-4xl font-semibold'>{home.restaurant?.name}</h1>
                    <p className='text-slate-800 flex items-center gap-3 mt-1'>
                        <span>
                            {home.restaurant?.description}
                        </span>
                    </p>
                    <div className='space-y-3 mt-3'>
                        <p className='text-slate-800 flex items-center gap-3 pt-2'>
                            <LocationOnIcon />
                            <span>
                                {home.restaurant?.address.city},  {home.restaurant?.address.state},   {home.restaurant?.address.pinCode}
                            </span>
                        </p>
                        <p className='text-slate-800 flex items-center gap-3 pt-2'>
                            <CalendarTodayIcon />
                            <span>
                                {home.restaurant?.workingHours}
                            </span>
                        </p>
                    </div>
                </div>
            </section >


            <section section className='mt-5' >
                <Box sx={{ width: '100%' }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs
                            textColor="black"
                            value={value}
                            onChange={handleChange}
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: "#ff0000",
                                    fontSize: "20px"
                                }
                            }}
                            aria-label=""
                        >
                            <Tab label="Overview" {...a11yProps(0)} />
                            <Tab label="Menu" {...a11yProps(1)} />
                            <Tab label="Deals" {...a11yProps(2)} />
                            <Tab label="Photos" {...a11yProps(3)} />
                        </Tabs>
                    </Box>
                    <CustomTabPanel value={value} index={0}>
                        <RestaurantOverview restaurant={home.restaurant} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={1}>
                        <RestaurantMenu restaurant={home.restaurant} />
                    </CustomTabPanel>
                    <CustomTabPanel value={value} index={2}>
                        <RestaurantDeals Offers={home.restaurantOffers} />
                    </CustomTabPanel>
                    <CustomTabPanel id="restaurant-images" value={value} index={3}>
                        <RestaurantImages restaurant={home.restaurant} />
                    </CustomTabPanel>
                </Box>
            </section>
        </div >
    )
}

export default RestaurantDetails