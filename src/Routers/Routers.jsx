import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RestaurantOwnerRouters from './RestaurantOwnerRouters'
import CustomerRouters from './CustomerRouters'
import ProtectedRoute from './ProtectedRoute'
import RestaurantDetails from '../components/Restaurant/RestaurantDetails'
import RestaurantSearch from '../components/Restaurant/RestaurantSearch'
import Error from '../components/Error/Error'
import UnauthorizedPage from '../components/Error/UnauthorizedPage'
import { Navbar } from '../components/Navbar/Navbar'
import { Home } from '../components/Home/Home'
import Register from '../components/Auth/Register'
import RestaurantRegisterFrom from '../components/Auth/RestaurantRegisterFrom'
import Login from '../components/Auth/Login'

const Routers = () => {
  return (

    <div>
      <Navbar />
      
      <Routes>

        {/* Home Routers */}
        <Route path='/' element={<Home />} />
        <Route path='/account/login' element={<Login />} />
        <Route path='/account/register' element={<Register />} />
        <Route path='/account/restaurantRegister' element={<RestaurantRegisterFrom />} />
        <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails />} />
        <Route path='/restaurant/search' element={<RestaurantSearch />} />
        <Route path='/error' element={<Error />} />
        <Route path='/unauthorized' element={<UnauthorizedPage />} />


        {/* Customer Routers */}
        <Route path='/user/*' element={
          <ProtectedRoute roles={['ROLE_CUSTOMER']}>
            <CustomerRouters />
          </ProtectedRoute>
        } />


        {/* Restaurant Owner Routers */}
        <Route path='/admin/restaurant/*' element={
          <ProtectedRoute roles={['ROLE_RESTAURANT_OWNER']}>
            <RestaurantOwnerRouters />
          </ProtectedRoute>
        } />

      </Routes>
    </div>
  )
}

export default Routers