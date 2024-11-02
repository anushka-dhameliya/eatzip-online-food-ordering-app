import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom';
import CustomerOrders from './CustomerOrders';
import CustomerAddresses from './CustomerAddresses';
import CustomerNotifications from './CustomerNotifications';
import UserProfile from '../../User/UserProfile';

const CustomerProfile = () => {
  return (
    <div className='lg:flex justify-between'>
      <div className=''>
        <Routes>
          <Route path="/" element={<UserProfile />}></Route>
          <Route path="/account" element={<UserProfile />}></Route>
          <Route path="/orders" element={<CustomerOrders />}></Route>
          <Route path="/addresses" element={<CustomerAddresses />}></Route>
          <Route path="/notifications" element={<CustomerNotifications />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default CustomerProfile