import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import { useSelector } from 'react-redux'
import CustomerProfile from '../components/Customer/Profile/CustomerProfile';
import Cart from '../components/Customer/Cart/Cart';
import Error from '../components/Error/Error'
import PaymentSucess from '../components/Customer/Payment/PaymentSucess';
import PaymentError from '../components/Customer/Payment/PaymentError';


const CustomerRouters = () => {
  const { home } = useSelector(store => store);
  const jwtToken = localStorage.getItem("jwtToken");
  const role = localStorage.getItem("role");

  return (
    <div>
        <Routes>
            <Route path='/cart' element={<Cart />} errorElement={<Error />}/>
            <Route path='/my-profile/*' element={<CustomerProfile />} />
            <Route path='/payment/success/:id' element={<PaymentSucess/>} />
            <Route path='/payment/error' element={<PaymentError/>} />
        </Routes>
    </div>
  )
}

export default CustomerRouters