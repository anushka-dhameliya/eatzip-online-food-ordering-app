import React, { useEffect, useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import RestaurantDetails from './RestaurantDetails';
import RestaurantImages from './RestaurantImages';
import RestaurantAddOns from './RestaurantAddOns';
import RestaurantOrders from './RestaurantOrders';
import RestaurantOffers from './RestaurantOffers';
import RestaurantNotifications from './RestaurantNotifications';
import { useDispatch } from 'react-redux';
import { getRestaurantByUserId } from '../../State/RestaurantOwner/Restaurant/Action';
import RestaurantMenuCategory from './RestaurantMenuCategory';
import RestaurantMenuItem from './RestaurantMenuItem';
import UserProfile from '../../User/UserProfile';

const RestaurantProfile = () => {
  const [openSideBar, setOpenSideBar] = useState(false);

  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");

  useEffect(() => {
    if (jwtToken !== null && jwtToken !== undefined) {
      dispatch(getRestaurantByUserId({ jwtToken: jwtToken }));
    }
  }, [jwtToken]);


  return (
    <div className='lg:flex justify-between'>
      <div>
        <Routes>
          <Route path="/" element={<UserProfile />}></Route>
          <Route path="/account" element={<UserProfile />}></Route>
          <Route path="/details" element={<RestaurantDetails />}></Route>
          <Route path="/images" element={<RestaurantImages />}></Route>
          <Route path="/menu-category" element={<RestaurantMenuCategory />}></Route>
          <Route path="/menu-item" element={<RestaurantMenuItem />}></Route>
          <Route path="/add-ons" element={<RestaurantAddOns />}></Route>
          <Route path="/orders" element={<RestaurantOrders />}></Route>
          <Route path="/offers" element={<RestaurantOffers />}></Route>
          <Route path="/notifications" element={<RestaurantNotifications />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default RestaurantProfile