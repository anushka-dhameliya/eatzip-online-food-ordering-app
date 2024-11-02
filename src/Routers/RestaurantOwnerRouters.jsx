import React from 'react'
import { Route, Routes } from 'react-router-dom'
import RestaurantProfile from '../components/RestaurantOwner/Profile/RestaurantProfile'

const RestaurantOwnerRouters = () => {
  return (
    <div>
      <Routes>
        <Route path='/*' element={<RestaurantProfile />} />
      </Routes>
    </div>
  )
}

export default RestaurantOwnerRouters