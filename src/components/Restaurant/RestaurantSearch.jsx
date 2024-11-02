import { Box, IconButton, InputAdornment, OutlinedInput, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import RestaurantCard from './RestaurantCard';
import { useDispatch, useSelector } from 'react-redux';
import { filterRestarants } from '../State/Home/Action';
import SearchIcon from '@mui/icons-material/Search';
import { grey, pink } from '@mui/material/colors';
import StorefrontIcon from '@mui/icons-material/Storefront';

const RestaurantSearch = () => {

    const dispatch = useDispatch();
    const { home } = useSelector(store => store);

    const [searchKey, setSearchKey] = useState('');

    let [searchParams, setSearchParams] = useSearchParams();
    let [category, setCategory] = React.useState(
        searchParams.get("category")
    );
    let [city, setCity] = React.useState(
        searchParams.get("city")
    );

    console.log('categoryParam : ', category);
    console.log('city : ', city);

    useEffect(() => {
        if (category !== 'null' && category !== undefined && category != '') {
            setSearchKey(category);
            dispatch(filterRestarants({ category: category }));
        }

    }, [category]);

    useEffect(() => {
        if (city !== null && city !== undefined && city != '')
            dispatch(filterRestarants({ city: city }));
    }, [city]);


    const handleSearch = (searchValue) => {
        category = null;
        dispatch(filterRestarants({ name: searchValue, category: searchValue }));
    }

    return (
        <div className='px-5 lg:px-20 pt-10'>
            <section className='pb-5'>
                <Box
                    className='flex flex-wrap items-center justify-center'
                    noValidate
                    autoComplete="off"
                >
                    <OutlinedInput
                        value={searchKey}
                        fullWidth
                        placeholder="Search for Restaurants and Food items...."
                        onChange={(e) => { setSearchKey(e.target.value) }}
                        onKeyUp={(ev) => {
                            if (ev.key === 'Enter') {
                                console.log("value : ", ev.target.value);
                                handleSearch(ev.target.value);
                            }
                        }}
                        id="search-field"
                        sx={{
                            borderStartStartRadius: '25px',
                            borderStartEndRadius: '25px',
                            borderEndStartRadius: '25px',
                            borderEndEndRadius: '25px'
                        }}
                        endAdornment={<InputAdornment position="end">
                            <IconButton
                                onClick={() => {
                                    console.log("value : ", searchKey);
                                    handleSearch(searchKey);
                                }}
                                edge="end"
                            >
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>}
                        variant="outlined"
                    />
                </Box>
            </section>

            <section className='pt-5 pb-10' style={{ backgroundColor: grey[50] }}>
                <p className='px-3 text-xl pb-8'><StorefrontIcon /> Restaurants ({home.searchRestaurants?.length})</p>

                {
                    home.searchRestaurants?.length > 0 ? (
                        <div className='flex flex-wrap items-center justify-center gap-5'>
                            {
                                home.searchRestaurants?.map((item) => <RestaurantCard restaurant={item} />)
                            }
                        </div>
                    ) :
                        (
                            <div className='justify-center text-center' style={{ left: '50%' }}>
                                <div className='text-center py-5'>
                                    <SearchIcon sx={{
                                        width: '3rem',
                                        height: '3rem',
                                        backgroundColor: pink[400],
                                        color: 'white',
                                        fontSize: '2rem',
                                        padding: '0.5rem',
                                        borderRadius: '5px'
                                    }} />
                                    <p className='text-xl font-semibold mt-3'>Nothing Found</p>
                                    <p className='text-gray-600 mt-2'>
                                        we could not find anything that would match your search request,
                                    </p>
                                    <p className='text-gray-600'>
                                        please try again.
                                    </p>
                                </div>
                            </div>
                        )
                }
            </section>
        </div>

    )
}

export default RestaurantSearch