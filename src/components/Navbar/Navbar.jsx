import { Avatar, Badge, Box, IconButton, Menu, MenuItem, Typography, Tooltip, Drawer, Stack } from '@mui/material'
import * as React from 'react'
import SearchIcon from '@mui/icons-material/Search';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import { deepPurple, grey, pink } from '@mui/material/colors';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import Button from '@mui/material/Button';
import "./Navbar.css";
import Divider from '@mui/material/Divider';
import NotificationsIcon from '@mui/icons-material/Notifications';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../State/Authentication/Action';
import { getNotificationCount } from '../State/Notification/Action';
import { getCartByUserId } from '../State/Customer/Cart/Action';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ImageIcon from '@mui/icons-material/Image';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AddCardIcon from '@mui/icons-material/AddCard';
import InfoIcon from '@mui/icons-material/Info';
import CategoryIcon from '@mui/icons-material/Category';


function UserSignInMenu() {
    const navigate = useNavigate();
    return (
        <div>
            <Button onClick={() => navigate("/account/login")} sx={{ borderColor: grey.A100 }} color="white" variant="outlined" fullWidth>
                <Typography className='text-gray-100'>Sign in</Typography>
            </Button>
        </div>
    );
}

const customerMenu = [
    {
        title: "Account",
        icon: <AccountCircleIcon />
    },
    {
        title: "Orders",
        icon: <ShoppingBagIcon />
    },
    {
        title: "Addresses",
        icon: <HomeIcon />
    },
    {
        title: "Notifications",
        icon: <NotificationsIcon />
    }
];


const restaurantOwnermenu = [
    {
        title: "Account",
        url: "account",
        icon: <AccountCircleIcon />
    },
    {
        title: "Restaurant Details",
        url: "details",
        icon: <InfoIcon />
    },
    {
        title: "Restaurant Images",
        url: "images",
        icon: <ImageIcon />
    },
    {
        title: "Menu Categories",
        url: "menu-category",
        icon: <CategoryIcon />
    },
    {
        title: "Menu Items",
        url: "menu-item",
        icon: <RestaurantMenuIcon />
    },
    {
        title: "Add-Ons",
        url: "add-ons",
        icon: <AddCardIcon />
    },
    {
        title: "Orders",
        url: "orders",
        icon: <ShoppingBagIcon />
    },
    {
        title: "Offers",
        url: "offers",
        icon: <LocalOfferIcon />
    },
    {
        title: "Notifications",
        url: "notifications",
        icon: <NotificationsIcon />
    }
];

function UserLoggedInMenu({ auth }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        navigate("/");
    }

    const handleNotificationClick = () => {
        if (auth.user?.role === "ROLE_CUSTOMER") {
            navigate("/user/my-profile/notifications");
        }
        if (auth.user?.role === "ROLE_RESTAURANT_OWNER") {
            navigate("/admin/restaurant/notifications");
        }
    }

    const { notification, cart } = useSelector(store => store);

    const handleRestaurantOwnerNavigate = (item) => {
        console.log("url : ", `/admin/restaurant/${item.url.toLowerCase()}`);
        navigate(`/admin/restaurant/${item.url.toLowerCase()}`)
    }

    const handleCustomerNavigate = (item) => {
        console.log("url : ", `/user/my-profile/${item.title.toLowerCase()}`);
        navigate(`/user/my-profile/${item.title.toLowerCase()}`)
    }

    return (
        <>
            <div>
                <Tooltip title="Account">
                    <IconButton
                        onClick={handleClick}
                        size="small"
                        sx={{ ml: 2 }}
                        aria-controls={open ? 'account-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                    >
                        {
                            auth.user?.profileImageUrl !== null && auth.user?.profileImageUrl !== undefined && auth.user?.profileImageUrl != '' ?
                                (
                                    <Avatar
                                        src={auth.user.profileImageUrl}
                                    />
                                ) :
                                (
                                    <Avatar sx={{ bgcolor: deepPurple.A400 }}>{auth.user?.fullName[0].toUpperCase()}</Avatar>
                                )
                        }
                    </IconButton>
                </Tooltip>
            </div>
            <div>
                <Tooltip title="Notifications">
                    <IconButton
                        size="small"
                        sx={{ ml: 0 }}
                    >
                        <Badge badgeContent={notification.notificationCount} color="primary">
                            <NotificationsIcon onClick={handleNotificationClick} sx={{ fontSize: "1.5rem", color: grey.A100 }}></NotificationsIcon>
                        </Badge>
                    </IconButton>
                </Tooltip>
            </div>
            <div>
                {
                    auth.user?.role === "ROLE_CUSTOMER" ?
                        (
                            <IconButton>
                                <Badge badgeContent={cart.cartItems?.length} color="primary">
                                    <ShoppingCartIcon onClick={() => navigate("/user/cart")} sx={{ fontSize: "1.5rem", color: grey.A100 }}></ShoppingCartIcon>
                                </Badge>
                            </IconButton>
                        )
                        : (<></>)
                }

            </div>

            <Menu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                slotProps={{
                    paper: {
                        elevation: 0,
                        sx: {
                            width: auth.user?.role === "ROLE_CUSTOMER" ? '10rem' : '12rem',
                            overflow: 'visible',
                            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                            mt: 1.5,
                            '& .MuiAvatar-root': {
                                width: 32,
                                height: 32,
                                ml: -0.5,
                                mr: 1,
                            },
                            '&::before': {
                                content: '""',
                                display: 'block',
                                position: 'absolute',
                                top: 0,
                                right: 14,
                                width: 10,
                                height: 10,
                                bgcolor: 'background.paper',
                                transform: 'translateY(-50%) rotate(45deg)',
                                zIndex: 0,
                            },
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >

                {
                    auth.user?.role === "ROLE_CUSTOMER" ?
                        (
                            customerMenu.map((item) => (
                                <MenuItem onClick={() => handleCustomerNavigate(item)}>
                                    {item.title}
                                </MenuItem>
                            ))
                        )
                        :
                        restaurantOwnermenu.map((item) => (
                            <MenuItem onClick={() => handleRestaurantOwnerNavigate(item)}>
                                {item.title}
                            </MenuItem>
                        ))
                }

                <Divider variant='middle' />
                <MenuItem onClick={handleLogout}>
                    Logout
                </MenuItem>
            </Menu>

        </>
    );
}



export const Navbar = () => {

    const navigate = useNavigate();

    const jwtToken = localStorage.getItem('jwtToken');

    const dispatch = useDispatch();

    const { auth } = useSelector(store => store);


    React.useEffect(() => {
        if (jwtToken !== null && jwtToken !== undefined) {
            dispatch(getCartByUserId({ jwtToken: jwtToken, userId: auth.user?.id }));
            dispatch(getNotificationCount({ jwtToken }));
        }

    }, [jwtToken, auth.user]);


    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
        setOpen(newOpen);
    };

    const DrawerList = (
        <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)}>
            <div className='pb-5'>
                {['Home', 'News', 'About', 'Contact Us', 'Our Team'].map((text) => (
                    <Button
                        fullWidth
                        variant='outlined'
                        sx={{ pt: 2, pb: 1 }}
                        style={{
                            color: pink[300],
                            border: 0
                        }}
                        onClick={() => navigate("/")}
                    >
                        <p className='font-semibold font-sans'>{text}</p>

                    </Button>
                ))}
            </div>
            <Divider />
            <div className='mt-5 mb-5'>
                <Stack direction={{ xs: 'column', sm: 'row' }}
                    spacing={{ xs: 1, sm: 2, md: 2 }}
                    sx={{
                        justifyContent: "center",
                        alignItems: "center",
                    }}>
                    <Avatar style={{ backgroundColor: pink[600] }}>
                        <FacebookIcon />
                    </Avatar>
                    <Avatar style={{ backgroundColor: pink[600] }}>
                        <InstagramIcon />
                    </Avatar>
                    <Avatar style={{ backgroundColor: pink[600] }}>
                        <YouTubeIcon />
                    </Avatar>
                    <Avatar style={{ backgroundColor: pink[600] }}>
                        <TwitterIcon />
                    </Avatar>
                </Stack>
            </div>


            <Divider />
            <div className='ml-10 mt-10'>
                <Button
                    variant='outlined'
                    sx={{ width: '25vh' }}
                    style={{
                        color: pink[300],
                        borderColor: pink[900]
                    }}
                    onClick={toggleDrawer(false)}
                >
                    Close
                </Button>
            </div>

            <Divider className='pt-40' />
            <div className='pt-3 items-center justify-center text-center h-2'>
                <p className='font-normal text-sm text-pink-700' >Designed By <span className='font-semibold pl-1 font-serif'>Anushka Dhameliya</span></p>
            </div>
        </Box>
    );

    return (
        <Box className='px-5 sticky h-16 top-0 z-50 py-[.8rem] bg-[#e91e63] lg:px-20 flex justify-between' sx={{ boxShadow: 4 }}>

            <div className='flex items-center space-x-4' onClick={() => navigate("/")}>
                <div className='lg:mr-10 cursor-pointer flex items-center space-x-4'>
                    <li className='-mt-2 logo text-gray-100 text-4xl rooster-font font-light'>
                        EatZip
                    </li>
                </div>
            </div>

            <div className='flex items-center space-x-2 lg:space-x-10'>
                <div className=''>
                    <Button onClick={() => navigate("/restaurant/search")} variant='text' startIcon={<SearchIcon sx={{ fontSize: "1.5rem", color: grey.A100 }}></SearchIcon>}>
                        Search
                    </Button>
                </div>

                {
                    auth.user !== null && auth.user !== undefined ? (
                        <UserLoggedInMenu auth={auth} />
                    ) : (
                        <UserSignInMenu />
                    )
                }

                <div className=''>
                    <Button sx={{ width: '5vh' }} startIcon={<MenuIcon />} onClick={toggleDrawer(true)}></Button>
                    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
                        {DrawerList}
                    </Drawer>
                </div>

            </div>
        </Box>

    )
}
