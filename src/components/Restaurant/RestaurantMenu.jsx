
import { FormControl, FormControlLabel, Radio, RadioGroup, Typography, Card, Divider } from '@mui/material';
import { pink } from '@mui/material/colors';
import React, { useEffect } from 'react'
import RestaurantMenuCard from './RestaurantMenuCard';
import { useDispatch, useSelector } from 'react-redux';
import { filterMenuItemsByRestaurantId, getMenuItemsByRestaurantId } from '../State/Home/Action';
import { getCartByUserId } from '../State/Customer/Cart/Action';


const foodTypes = [
    {
        label: "All",
        value: "all"
    },
    {
        label: "Veg",
        value: "veg"
    },
    {
        label: "Non-Veg",
        value: "non-veg"
    }
];

const pureVegFoodTypes = [
    {
        label: "All",
        value: "all"
    },
    {
        label: "Veg",
        value: "veg"
    }
];

const RestaurantMenu = ({ restaurant }) => {

    const dispatch = useDispatch();

    const { auth, cart, home } = useSelector(store => store);
    const role = localStorage.getItem("role");
    const jwtToken = localStorage.getItem('jwtToken');

    var menuCategoryName = "";


    useEffect(() => {
        if (jwtToken !== null && jwtToken !== undefined && auth.user != undefined && auth.user != null) {
            dispatch(getCartByUserId({ jwtToken: jwtToken, userId: auth.user.id }));
        }

    }, [jwtToken, auth.user]);

    const [foodType, setFoodType] = React.useState('all');
    const [category, setCategory] = React.useState('');

    const handleChange = (event, newFoodType) => {
        setFoodType(newFoodType);
        setCategory('');
        console.log("toggle button clicked ", newFoodType);
        if (newFoodType === "all") {
            dispatch(getMenuItemsByRestaurantId({ restaurantId: restaurant.id }));
        }
        if (newFoodType === "veg") {
            dispatch(filterMenuItemsByRestaurantId({ restaurantId: restaurant.id, name: '', isVegetarian: 'veg', category: '' }));
        }
        if (newFoodType === "non-veg") {
            dispatch(filterMenuItemsByRestaurantId({ restaurantId: restaurant.id, name: '', isVegetarian: 'non-veg', category: '' }));
        }

    };

    const handleCategoryChange = (event, category) => {
        setFoodType('');
        setCategory(category);
        console.log("categoey : ", category);
        dispatch(filterMenuItemsByRestaurantId({ restaurantId: restaurant.id, name: '', isVegetarian: '', category: category }));
    }

    return (
        <section className='pt-[2rem] lg:flex relative'>

            <div className='space-y-10 lg:w-[20%] filter'>
                <Card className='p-3' elevation={5}>
                    <div className='box space-y-10 lg:sticky pl-2 pb-5'>
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Type
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleChange} value={foodType}>
                                    {
                                        restaurant?.vegetarian == true ?
                                            (
                                                pureVegFoodTypes?.map((item) => (
                                                    <FormControlLabel
                                                        sx={{ width: '15rem' }}
                                                        value={item.value}
                                                        label={
                                                            <p className='text-sm'
                                                                style={{
                                                                    textWrap: 'balance',
                                                                    wordWrap: 'break-word'
                                                                }}>
                                                                {item.label}  (
                                                                {
                                                                    item.value == 'all' ? home?.menuItems?.length :
                                                                        (item.value == 'veg' ? (home?.menuItems?.filter(i => i.vegetarian == true).length) :
                                                                            (home?.menuItems?.filter(i => i.vegetarian == false)).length)
                                                                }
                                                                )
                                                            </p>
                                                        }
                                                        control={<Radio sx={{
                                                            '&.Mui-checked': {
                                                                color: pink[500],
                                                            },
                                                        }} />}
                                                    >
                                                    </FormControlLabel>
                                                ))
                                            )
                                            : (
                                                foodTypes?.map((item) => (
                                                    <FormControlLabel
                                                        sx={{ width: '15rem' }}
                                                        value={item.value}
                                                        label={
                                                            <p className='text-sm'
                                                                style={{
                                                                    textWrap: 'balance',
                                                                    wordWrap: 'break-word'
                                                                }}>
                                                                {item.label}  (
                                                                {
                                                                    item.value == 'all' ? home?.menuItems?.length :
                                                                        (item.value == 'veg' ? (home?.menuItems?.filter(i => i.vegetarian == true).length) :
                                                                            (home?.menuItems?.filter(i => i.vegetarian == false)).length)
                                                                }
                                                                )
                                                            </p>
                                                        }
                                                        control={<Radio sx={{
                                                            '&.Mui-checked': {
                                                                color: pink[500],
                                                            },
                                                        }} />}
                                                    >
                                                    </FormControlLabel>
                                                ))
                                            )
                                    }
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                    <Divider variant="middle" />
                    <div className='box space-y-5 lg:sticky pt-5'>
                        <div>
                            <Typography variant="h5" sx={{ paddingBottom: "1rem" }}>
                                Categories
                            </Typography>
                            <FormControl className='py-10 space-y-5' component={"fieldset"}>
                                <RadioGroup onChange={handleCategoryChange} value={category}>
                                    {home.menuCategories?.map((item) => (
                                        <FormControlLabel
                                            sx={{ width: '12rem', paddingBottom: '0.5rem' }}
                                            value={item.name}
                                            label=
                                            {
                                                <p className='text-sm'
                                                    style={{
                                                        textWrap: 'balance',
                                                        wordWrap: 'break-word'
                                                    }}>
                                                    {item.name}  (
                                                    {
                                                        home?.menuItems?.filter(i => i.menuCategory.name == item.name).length
                                                    }
                                                    )
                                                </p>
                                            }
                                            control={<Radio sx={{
                                                '&.Mui-checked': {
                                                    color: pink[500],
                                                },
                                            }} />}
                                        >
                                        </FormControlLabel>
                                    ))}
                                </RadioGroup>
                            </FormControl>
                        </div>
                    </div>
                </Card>
            </div >

            <div className='space-y-5 lg:w-[80%] lg:pl-10'>

                <div className='flex flex-wrap items-center justify-center gap-5'>
                    {
                        home?.filteredMenuItems?.map((item, index) => {
                            let isChanged = false;
                            if (menuCategoryName !== item.menuCategory.name) {
                                isChanged = true;
                                menuCategoryName = item.menuCategory.name;
                            }
                            return (
                                <div>
                                    {
                                        isChanged ?
                                            (
                                                <p className='text-2xl pb-5 font-semibold'>{menuCategoryName}</p>
                                            )
                                            : (<></>)
                                    }
                                    <RestaurantMenuCard
                                        menuItem={item}
                                        addOnItems={home.addOnItems}
                                        IsPresentInCart={cart.cartItems?.length > 0 && cart.cartItems.filter(j => j.menuItem.id == item.id).length > 0 ? true : false}
                                        CartItemId={cart.cartItems?.length > 0 && cart.cartItems.filter(j => j.menuItem.id == item.id).length > 0 ? cart.cartItems.filter(j => j.menuItem.id == item.id)[0].id : 0}
                                        Quantity={cart.cartItems?.length > 0 && cart.cartItems.filter(j => j.menuItem.id == item.id).length > 0 ? cart.cartItems.filter(j => j.menuItem.id == item.id)[0].quantity : 0}
                                    />
                                    {
                                        index + 1 < home.menuItems.length && home.menuItems[index].menuCategory.name !== home.menuItems[index + 1].menuCategory.name ?
                                            (
                                                <Divider className='pt-10 pb-5 font-semibold' variant="middle" style={{ color: 'black' }}>
                                                    <img src="https://res.cloudinary.com/dqegh4o43/image/upload/v1729086176/divider_p6aviv.jpg" />
                                                </Divider>

                                            )
                                            : (<></>)
                                    }
                                </div>
                            )
                        }
                        )
                    }
                </div>

                <div className='pt-10'></div>
            </div>
        </section >
    )
}

export default RestaurantMenu