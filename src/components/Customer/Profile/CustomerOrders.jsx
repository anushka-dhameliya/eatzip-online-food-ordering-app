import React, { useEffect, useState } from 'react'
import CustomerOrderCard from './CustomerOrderCard'
import { useDispatch, useSelector } from 'react-redux';
import { filterOrdersByUserId, getAllOrdersByUserId } from '../../State/Customer/Order/Action';
import { Avatar, Box, Button, Card, Chip, Divider, Grid, IconButton, Paper, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { Height } from '@mui/icons-material';
import FiberNewIcon from '@mui/icons-material/FiberNew';
import GradingIcon from '@mui/icons-material/Grading';
import DoneIcon from '@mui/icons-material/Done';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import CreditCardOffIcon from '@mui/icons-material/CreditCardOff';
import CancelIcon from '@mui/icons-material/Cancel';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';


const orderStatuses = [
  {
    label: "All",
    value: "ALL",
    icon: <DensitySmallIcon />
  },
  {
    label: "New",
    value: "NEW",
    icon: <FiberNewIcon />
  },
  {
    label: "Accepted",
    value: "ACCEPTED",
    icon: <GradingIcon />

  }
  , {
    label: "Complete",
    value: "COMPLETE",
    icon: <DoneIcon />
  }
  , {
    label: "Delivered",
    value: "DELIVERED",
    icon: <DeliveryDiningIcon />
  }
  , {
    label: "Payment Failed",
    value: "PAYMENT_FAILED",
    icon: <CreditCardOffIcon />
  },
  {
    label: "Rejected",
    value: "REJECTED",
    icon: <CancelIcon />
  }
];

const CustomerOrders = () => {
  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const { orderCustomer } = useSelector(store => store);

  useEffect(() => {
    if (jwtToken !== null && jwtToken !== undefined) {
      dispatch(getAllOrdersByUserId({ jwtToken: jwtToken }));
    }

  }, [jwtToken]);

  const [statusSelected, setStatusSelected] = useState("ALL");

  const handleStausShow = (status) => {
    setStatusSelected(status);
    if (status == "ALL") {
      dispatch(getAllOrdersByUserId({ jwtToken: jwtToken }));
    }
    else {
      dispatch(filterOrdersByUserId({ jwtToken, status }));
    }
  }

  return (
    <div className='items-center justify-center px-10'>
      <h1 className='static text-xl text-center py-7 font-semibold ml-10'>
        My Orders
      </h1>
      <Paper elevation={0} style={{
        width: "100%",
        padding: '2rem'
      }}>
        <Grid container spacing={2} width="170vh">
          <Grid item xs={3}>
            <div className='space-y-10 filter'>
              <Card elevation={2} className='p-3'>
                <div className='box lg:sticky p-2'>
                  {
                    orderStatuses.map((item) => (
                      <Box
                        className='cursor-pointer p-[1rem] hover:bg-slate-200 hover:rounded-md mb-2'
                        onClick={() => handleStausShow(item.value)}
                        sx={
                          statusSelected == item.value ? {
                            backgroundColor: '#e2e8f0',
                            borderRadius: '0.375rem'
                          }
                            : {}
                        }
                      >
                        <IconButton style={{
                          marginRight: '1rem',
                          color: pink[600]
                        }} >
                          {item.icon}
                        </IconButton>
                        {item.label}
                      </Box>
                    ))
                  }
                </div>
              </Card>
            </div>
          </Grid>
          <Grid item xs={9}>
            <Paper elevation={0}>
              {
                orderCustomer.usersOrders.length > 0 ?
                  (<CustomerOrderCard orders={orderCustomer.usersOrders} />) : (
                    <Paper
                      elevation={0}
                      style={{
                        width: '100%',
                        paddingLeft: '6rem',
                        paddingTop: '15rem',
                        height : '90vh'
                      }}
                    >
                      <Typography variant="h6" className='text-center'>
                        <span className='font-sans'><em>No Orders!</em></span>
                      </Typography>
                    </Paper>
                  )
              }
            </Paper>
          </Grid>
        </Grid>
      </Paper>

    </div>
  )
}

export default CustomerOrders