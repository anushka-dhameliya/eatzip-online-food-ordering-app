import React from 'react'
import { useSelector } from 'react-redux';
import AddressCard from '../Address/AddressCard';

const CustomerAddresses = () => {
  const { auth } = useSelector(store => store);
  const createOrderUsingSelectedAddress = () => {

  }

  return (
    <div className='items-center justify-center px-10'>
      <div className='text-center'>
        <h1 className='text-xl py-10 font-semibold w-[100%]'>
          My Addresses
        </h1>
      </div>

      <div className='space-y-5'>
        <div className='flex gap-5 flex-wrap justify-start'>
          {auth.user?.addresses.map((item) =>
            <AddressCard handleSelectAddress={createOrderUsingSelectedAddress} item={item} showButton={false} isSelected={null} />
          )}
        </div>
      </div>
    </div>
  )
}

export default CustomerAddresses