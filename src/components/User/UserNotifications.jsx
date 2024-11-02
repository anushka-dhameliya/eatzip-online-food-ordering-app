import React, { useEffect, useState } from 'react'
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Card, Chip, Grid, IconButton, Typography } from '@mui/material';
import { pink } from '@mui/material/colors';
import { useDispatch, useSelector } from 'react-redux';
import { filterNotifications, getAllNotifications, updateNotificationStatus } from '../State/Notification/Action';
import MarkAsUnreadIcon from '@mui/icons-material/MarkAsUnread';
import MarkunreadIcon from '@mui/icons-material/Markunread';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';


const columns = [
    {
        id: 'description',
        label: 'Description',
        minWidth: '30rem'
    },
    {
        id: 'generatedTime',
        label: 'Generated Time',
        minWidth: '10rem',
        align: 'center'
    },
    {
        id: 'readTime',
        label: 'Read Time',
        minWidth: '10rem',
        align: 'center'
    },
    {
        id: 'status',
        label: 'Status',
        minWidth: '10rem',
        align: 'center'
    }
];

const statuses = [
    {
        label: "All",
        value: "ALL",
        icon: <DensitySmallIcon />
    },
    {
        label: "Unread",
        value: "UNREAD",
        icon: <MarkAsUnreadIcon />
    },
    {
        label: "Read",
        value: "READ",
        icon: <MarkunreadIcon />
    }
];



const UserNotifications = () => {

    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem("jwtToken");
    const { notification } = useSelector(store => store);

    useEffect(() => {
        if (jwtToken !== null && jwtToken !== undefined) {
            dispatch(getAllNotifications({ jwtToken: jwtToken }));
        }

    }, [jwtToken]);

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleStatusChange = (id, status) => {
        console.log(id, status);
        if (status == 'UNREAD') {
            dispatch(updateNotificationStatus({ jwtToken: jwtToken, id: id, status: 'READ' }));
        }
        if (status == 'READ') {
            dispatch(updateNotificationStatus({ jwtToken: jwtToken, id: id, status: 'UNREAD' }));
        }
    }

    const [statusSelected, setStatusSelected] = useState("ALL");

    const handleStausShow = (status) => {
        setStatusSelected(status);
        if (status == "ALL") {
            dispatch(getAllNotifications({ jwtToken: jwtToken }));
        }
        else {
            dispatch(filterNotifications({ jwtToken, status }));
        }

    }


    return (
        <div className='items-center justify-center px-10'>
            <h1 className='text-xl text-center py-10 font-semibold'>
                Notifications
            </h1>
            <div>
                <Grid container spacing={2}>
                    <Grid item xs={2}>
                        <div className='space-y-10 filter'>
                            <Card elevation={2} className='p-3'>
                                <div className='box lg:sticky p-2'>
                                    {
                                        statuses.map((i) => (
                                            <Box
                                                className='cursor-pointer p-[1rem] hover:bg-slate-200 hover:rounded-md mb-2'
                                                onClick={() => handleStausShow(i.value)}
                                                sx={
                                                    statusSelected == i.value ? {
                                                        backgroundColor: '#e2e8f0',
                                                        borderRadius: '0.375rem'
                                                    }
                                                        : {}
                                                }
                                            >
                                                <IconButton style={{
                                                    marginRight: '1rem',
                                                    color: pink[600]
                                                }}>
                                                    {i.icon}
                                                </IconButton>
                                                {i.label}
                                            </Box>
                                        ))
                                    }
                                </div>
                            </Card>
                        </div>
                    </Grid>
                    <Grid item xs={10}>
                        <div className='space-y-5 pl-10'>
                            <div className='flex space-y-5 w-full'>
                                <Paper sx={{ width: '100%' }}>
                                    <TableContainer sx={{ maxHeight: 440 }}>
                                        <Table stickyHeader aria-label="sticky table">
                                            <TableHead>
                                                <TableRow sx={{
                                                    "& th": {
                                                        color: "black",
                                                        backgroundColor: "#d1d5db"
                                                    }
                                                }}>
                                                    {columns.map((column) => (
                                                        <TableCell
                                                            key={column.id}
                                                            align={column.align}
                                                            style={{ top: 0, width: column.minWidth }}
                                                        >
                                                            <Typography className='text-semibold'>{column.label}</Typography>
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {notification.notifications
                                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                                    .map((row) => {
                                                        return (
                                                            <TableRow sx={{ cursor: "pointer" }} hover role="checkbox" tabIndex={-1} key={row.code}>
                                                                {columns.map((column) => {
                                                                    const value = row[column.id];
                                                                    return (
                                                                        column.id === 'status' ?
                                                                            (
                                                                                <TableCell key={column.id} align={column.align} style={{ top: 0, width: column.minWidth }}>
                                                                                    <Chip
                                                                                        label={value}
                                                                                        color={value == 'UNREAD' ? "error" : "success"}
                                                                                        onClick={() => handleStatusChange(row.id, value)} />
                                                                                </TableCell>
                                                                            ) :
                                                                            (
                                                                                column.id === 'generatedTime' || column.id === 'readTime' ?
                                                                                    (
                                                                                        value !== null ?
                                                                                            (
                                                                                                <TableCell key={column.id} align={column.align} style={{ top: 0, width: column.minWidth }}>
                                                                                                    {new Date(value).toLocaleString()}
                                                                                                </TableCell>
                                                                                            ) :
                                                                                            (
                                                                                                <TableCell key={column.id} align={column.align} style={{ top: 0, width: column.minWidth }}></TableCell>
                                                                                            )
                                                                                    ) :
                                                                                    (
                                                                                        <TableCell key={column.id} align={column.align} style={{ top: 0, width: column.minWidth }}>
                                                                                            {value}
                                                                                        </TableCell>
                                                                                    )
                                                                            )
                                                                    );
                                                                })}
                                                            </TableRow>
                                                        );
                                                    })}
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25, 100]}
                                        component="div"
                                        count={notification.notifications.length}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        onPageChange={handleChangePage}
                                        onRowsPerPageChange={handleChangeRowsPerPage}
                                    />
                                </Paper>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default UserNotifications