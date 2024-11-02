import React, { useEffect, useState } from 'react'
import "./Home.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import MultipleItemCarousel from './MultipleItemCarousel';
import RestaurantCard from '../Restaurant/RestaurantCard';
import { Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllRestaurants } from '../State/Home/Action';


export const Home = () => {
    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem('jwtToken');
    const { home } = useSelector(store => store);
    useEffect(() => {
        dispatch(getAllRestaurants());
    }, []);
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className=''>
            <section className='banner -z-50 flex flex-col justify-center items-center'>
                <div className='w-[50vw] z-10 text-center'>
                    <p className='text-stone-100 text-2xl lg:text-6xl font-bold z-10 py-5'>Order. Eat. Enjoy.</p>
                    <Button
                        variant="outlined"
                        size="large"
                        className={`m-1 w-[10rem] h-[3rem] animated-button ${isHovered ? 'hovered' : ''}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={(e) => {
                            const element = document.getElementById('item-crousel');
                            element?.scrollIntoView({
                                behavior: 'smooth'
                            });
                        }}
                        style={{
                            color: 'white',
                            border: '3px solid white',
                            borderRadius: '20px'
                        }}>
                        <p className='font-semibold'>Order Now</p>
                    </Button>
                </div>
                <div className='cover absolute top-0 left-0 right-0'></div>
                <div className='fadout'></div>
            </section>
            <section id="item-crousel" className='p-10 lg:py-10 lg:px-20 bg-gray-200'>
                <p className='text-2xl font-semibold text-slate-950 py-3 pb-10'>Need Help ?</p>
                <MultipleItemCarousel />
            </section>
            <section className='px-5 lg:px-20 pt-10 pb-[10rem]'>
                <h1 className='text-2xl font-semibold text-slate-950 pb-8'>Most Popular</h1>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                    {
                        home.restaurants.map((item) => <RestaurantCard restaurant={item} />)
                    }
                </div>
            </section>
        </div>
    )
}
