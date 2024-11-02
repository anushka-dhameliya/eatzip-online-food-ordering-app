import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { Edit } from '@mui/icons-material';
import { pink } from '@mui/material/colors';
import { Field, Form, Formik } from 'formik';
import { Button, Dialog, DialogContent, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuCategory, deleteMenuCategory, getAllMenuCategoriesForRestaurant, updateMenuCategory } from '../../State/RestaurantOwner/Restaurant/Action';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { NAME_REGEX } from '../../config/constant';

const MenuCategorySchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too short!')
        .max(30, 'Too long!')
        .required('Required')
        .matches(NAME_REGEX, 'Only Characters'),
    description: Yup.string().max(40, 'Too long!')
});


const columns = [
    {
        id: 'name',
        label: 'Name',
        align: 'center',
        minWidth: 250
    },
    {
        id: 'description',
        label: 'Description',
        align: 'left',
        minWidth: 250
    }
];

const RestaurantMenuCategory = () => {

    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem("jwtToken");
    const { restaurant } = useSelector(store => store);

    useEffect(() => {
        if (jwtToken !== null && jwtToken !== undefined) {
            dispatch(getAllMenuCategoriesForRestaurant({ jwtToken: jwtToken, restaurantId: restaurant.usersRestaurant?.id }));
        }
    }, [jwtToken, restaurant.usersRestaurant]);

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };


    //add new category form
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const handleAddNewCategorySubmit = (values) => {
        console.log("new menu category : ", values);
        const newMenuCategory = {
            name: values.name,
            description: values.description,
            restaurantId: restaurant.usersRestaurant.id
        };
        dispatch(createMenuCategory({ jwtToken, categoryData: newMenuCategory }));
        handleClose();
    }

    var [categoryValues, setCategoryValues] = useState({
        id: 0,
        name: "",
        description: ""
    });

    const handleEditOnClick = (values) => {
        categoryValues.id = values.id;
        categoryValues.name = values.name;
        categoryValues.description = values.description;
        setCategoryValues(categoryValues);
        handleEditClickOpen();
    }

    const [editOpen, setEditOpen] = useState(false);

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleEditCategorySubmit = (values) => {
        console.log("update category : ", values);
        const editMenuCategory = {
            id: categoryValues.id,
            name: values.name,
            description: values.description,
            restaurantId: restaurant.usersRestaurant.id
        };
        dispatch(updateMenuCategory({ jwtToken, menuCategoryId: categoryValues.id, categoryData: editMenuCategory }));
        handleEditClose();
    }

    const handleDeleteOnClick = (values) => {
        dispatch(deleteMenuCategory({ jwtToken, menuCategoryId: values.id }));
    }

    return (
        <div className='px-10'>
            <h1 className='text-xl lg:text-4xl text-center py-7 font-semibold ml-[15vw]'>
                Menu Categories
            </h1>
            <div className='space-y-5 w-full lg:w-[90vw] pt-12 pb-10 pl-10'>
                <Paper elevation={3}
                    sx={{
                        borderRadius: '3px'
                    }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={2}></TableCell>
                                    <TableCell>
                                        <Button variant='contained' sx={{ color: 'white' }} style={{ backgroundColor: '#f06292' }} startIcon={<AddIcon />} onClick={handleClickOpen}>Add</Button>
                                    </TableCell>
                                </TableRow>
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
                                            style={{ top: 0, minWidth: column.minWidth }}
                                        >
                                            <Typography className='text-semibold'>{column.label}</Typography>
                                        </TableCell>
                                    ))}
                                    <TableCell
                                        align='right'
                                        style={{ top: 0, minWidth: 50 }}
                                    >
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {restaurant.menuCategories
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow sx={{ cursor: "pointer" }} hover tabIndex={-1}>
                                                <TableCell align='center'>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {row.description}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={() => handleEditOnClick(row)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton>
                                                            <DeleteIcon onClick={() => handleDeleteOnClick(row)} />
                                                        </IconButton>
                                                    </Tooltip>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25, 100]}
                        component="div"
                        count={restaurant.menuCategories.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />
                </Paper>
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll='paper'
                fullWidth='false'
                maxWidth='xs'
            >
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <div className='pt-3'>
                        <Typography variant='h5' className='text-center'>
                            New Category
                        </Typography>
                        <Formik onSubmit={handleAddNewCategorySubmit}
                            initialValues={{
                                name: "",
                                description: ""
                            }}
                            validationSchema={MenuCategorySchema}>
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        variant="standard"
                                        sx={{ mt: 2 }}></Field>
                                    {errors.name && touched.name ? (
                                        <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.name}</div>
                                    ) : null}
                                    <Field
                                        as={TextField}
                                        name="description"
                                        label="Description"
                                        multiline
                                        fullWidth
                                        variant="standard"
                                        sx={{ mt: 2 }}></Field>
                                    {errors.description && touched.description ? (
                                        <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.description}</div>
                                    ) : null}
                                    <Button sx={{ mt: 3, padding: '1rem' }} fullWidth type='submit' variant='contained'>Save</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog
                open={editOpen}
                onClose={handleEditClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                scroll='paper'
                fullWidth='false'
                maxWidth='xs'
            >
                <IconButton
                    aria-label="close"
                    onClick={handleEditClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent>
                    <div className='pt-3'>
                        <Typography variant='h5' className='text-center'>
                            Update Category
                        </Typography>
                        <Formik onSubmit={handleEditCategorySubmit}
                            enableReinitialize
                            initialValues={{
                                name: categoryValues.name,
                                description: categoryValues.description
                            }}
                            validationSchema={MenuCategorySchema}>
                            {({ errors, touched }) => (
                                <Form>
                                    <Field
                                        as={TextField}
                                        name="name"
                                        label="Name"
                                        fullWidth
                                        variant="standard"
                                        sx={{ mt: 2 }}></Field>
                                    {errors.name && touched.name ? (
                                        <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.name}</div>
                                    ) : null}
                                    <Field
                                        as={TextField}
                                        name="description"
                                        label="Description"
                                        multiline
                                        fullWidth
                                        variant="standard"
                                        sx={{ mt: 2 }}></Field>
                                    {errors.description && touched.description ? (
                                        <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.description}</div>
                                    ) : null}
                                    <Button sx={{ mt: 3, padding: '1rem' }} fullWidth type='submit' variant='contained'>Save</Button>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </DialogContent>
            </Dialog>

        </div>
    )
}

export default RestaurantMenuCategory