import { Box, Card, Grid } from '@mui/material'
import React from 'react'
import { getMonth } from "../config/util";

const RestaurantDeals = ({ Offers }) => {
    return (
        <div>
            <section>
                <div className='flex flex-wrap items-center justify-center gap-5'>
                    {
                        Offers?.map((item) => (
                            item.type == "PERCENTAGE" ? (
                                <Card sx={{
                                    backgroundImage: "url('https://media.istockphoto.com/id/821760914/vector/pastel-multi-color-gradient-vector-background-simple-form-and-blend-with-copy-space.jpg?s=612x612&w=0&k=20&c=adwrMs3MkPLXMb69AYSoMpnCfLSAb_D3PCQRGGXiM5g=')",
                                    backgroundRepeat: "no-repeat",
                                    height: 130,
                                    width: 400,
                                }}>
                                    <Grid container spacing={2}>

                                        <Grid item xs={5}>
                                            <Box sx={{ border: 0, borderRadius: '50%' }}>
                                                <img style={{ height: '130px' }}
                                                    src='https://media.istockphoto.com/id/1366714989/vector/burger-with-tomato-and-lettuce-place-next-to-bread-sausages-and-an-orange-soda-can.jpg?s=612x612&w=0&k=20&c=cLaedUjqETgsbU4nQHnTcBg8wUfAb45KswIUTKXzyDM='
                                                />
                                            </Box>
                                        </Grid>

                                        <Grid item xs={7}>
                                            <p className='pt-3 text-center font-serif text-lg lg:text-xl'>USE  <span className='text-pink-700'><em>{item.name}</em></span></p>
                                            <p className='text-4xl lg:text-6xl text-center font-serif text-rose-400'>{item.percentage}% off</p>
                                            <p className='text-xs text-center'>Valid Until {new Date(item.toDate).getDate()} {getMonth(new Date(item.toDate).getMonth())} {new Date(item.toDate).getFullYear()}</p>
                                        </Grid>

                                    </Grid>
                                </Card>
                            ) :
                                (
                                    <Card sx={{
                                        backgroundImage: "url('https://media.istockphoto.com/id/821760914/vector/pastel-multi-color-gradient-vector-background-simple-form-and-blend-with-copy-space.jpg?s=612x612&w=0&k=20&c=adwrMs3MkPLXMb69AYSoMpnCfLSAb_D3PCQRGGXiM5g=')",
                                        backgroundRepeat: "no-repeat",
                                        height: 130,
                                        width: 400,
                                    }}>
                                        <Grid container spacing={2}>

                                            <Grid item xs={5}>
                                                <Box sx={{ border: 0, borderRadius: '50%' }}>
                                                    <img style={{ height: '130px' }}
                                                        src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQcZgywGoSQYjcpaLNmOICVc1O_nb4evtIYUw&s'
                                                    />
                                                </Box>
                                            </Grid>

                                            <Grid item xs={7}>
                                                <p className='pt-3 font-serif text-lg lg:text-xl text-center'>USE  <span className='text-pink-700'><em>{item.name}</em></span></p>
                                                <p className='text-4xl lg:text-6xl text-center font-serif text-rose-400'>₹{item.amount} off</p>
                                                <p className='text-xs text-center pt-1'>Valid Until {new Date(item.toDate).getDate()} {getMonth(new Date(item.toDate).getMonth())} {new Date(item.toDate).getFullYear()}</p>
                                            </Grid>

                                        </Grid>
                                    </Card>
                                )
                        )
                        )
                    }
                </div>

            </section>
        </div>
    )
}

export default RestaurantDeals