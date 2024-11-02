import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { pink } from '@mui/material/colors';
import { Field, Form, Formik } from 'formik';
import { Button, Checkbox, Dialog, DialogContent, FormControl, FormControlLabel, IconButton, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { createMenuItem, deleteMenuItem, getMenuItemsByRestaurantId, updateMenuItem } from '../../State/RestaurantOwner/Menu/Action';
import { NAME_REGEX } from '../../config/constant';
import * as Yup from 'yup';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { uploadImage } from '../../config/UploadImagesToCloudinary';
import { styled } from '@mui/material/styles';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getAllMenuCategoriesForRestaurant } from '../../State/RestaurantOwner/Restaurant/Action';



const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const MenuItemSchema = Yup.object().shape({
    name: Yup.string()
        .min(2, 'Too short!')
        .max(30, 'Too long!')
        .required('Required')
        .matches(NAME_REGEX, 'Only Characters'),
    menuCategoryName: Yup.string().required('Required'),
    price: Yup.number().min(0, "Invalid Price")
});


const columns = [
    {
        id: 'images',
        label: 'Image',
        align: 'center',
        minWidth: 100
    },
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
    },
    {
        id: 'isVegetarian',
        label: 'Vegetarian',
        align: 'center',
        minWidth: 30
    },
    {
        id: 'price',
        label: 'Price',
        align: 'left',
        minWidth: 50
    },
    {
        id: 'menuCategory',
        label: 'Menu Category',
        align: 'left',
        minWidth: 150
    }
];

const RestaurantMenuItem = () => {

    const dispatch = useDispatch();
    const jwtToken = localStorage.getItem("jwtToken");
    const { restaurant, menu } = useSelector(store => store);

    useEffect(() => {
        if (jwtToken !== null && jwtToken !== undefined) {
            dispatch(getAllMenuCategoriesForRestaurant({ jwtToken: jwtToken, restaurantId: restaurant.usersRestaurant?.id }));
            dispatch(getMenuItemsByRestaurantId({ jwtToken: jwtToken, restaurantId: restaurant.usersRestaurant?.id }));
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

    //new item form open
    const [menuItemImageUrl, setMenuItemImageUrl] = useState("");
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        let image_url = await uploadImage(file);
        setMenuItemImageUrl(image_url);
    }

    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setMenuItemImageUrl("");
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    let isVegetarian = false;
    const handleAddNewItemSubmit = (values) => {
        console.log("new menu item : ", values);
        let menuCategory = restaurant.menuCategories.filter(i => i.name == values.menuCategoryName)[0];
        const newMenuItem = {
            name: values.name,
            description: values.description,
            menuCategory: menuCategory,
            isVegetarian: isVegetarian,
            price: values.price,
            restaurantId: restaurant.usersRestaurant.id,
            images: []
        };
        if (menuItemImageUrl !== undefined && menuItemImageUrl != "") {
            newMenuItem.images.push(menuItemImageUrl);
        }
        console.log("new menu item data to send : ", newMenuItem);
        dispatch(createMenuItem({ jwtToken, menuItemData: newMenuItem }));
        handleClose();
    }

    var [menuItemValues, setMenuItemValues] = useState({
        id: 0,
        name: "",
        description: "",
        isVegetarian: false,
        price: 0,
        menuCategory: {}
    });


    const handleEditOnClick = (values) => {
        menuItemValues.id = values.id;
        menuItemValues.name = values.name;
        menuItemValues.description = values.description;
        menuItemValues.isVegetarian = values.vegetarian;
        menuItemValues.price = values.price;
        menuItemValues.menuCategory = values.menuCategory;
        setMenuItemValues(menuItemValues);
        handleEditClickOpen();
    }

    const [editOpen, setEditOpen] = useState(false);

    const handleEditClickOpen = () => {
        setEditOpen(true);
    };

    const handleEditClose = () => {
        setEditOpen(false);
    };

    const handleEditMenuItemSubmit = (values) => {
        console.log("update item : ", values);
        let menuCategory = restaurant.menuCategories.filter(i => i.name == values.menuCategoryName)[0];
        const editMenuItem = {
            id: menuItemValues.id,
            name: values.name,
            description: values.description,
            isVegetarian: menuItemValues.isVegetarian,
            price: values.price,
            menuCategory: menuCategory,
            restaurantId: restaurant.usersRestaurant.id
        };
        console.log("update item to send: ", editMenuItem);
        dispatch(updateMenuItem({ jwtToken, menuItemId: menuItemValues.id, menuItemData: editMenuItem }));
        handleEditClose();
    }

    const handleDeleteOnClick = (values) => {
        dispatch(deleteMenuItem({ jwtToken, menuItemId: values.id }));
    }



    return (
        <div className='px-10'>
            <h1 className='mt-3 text-xl lg:text-4xl text-center py-7 font-semibold ml-[8vw]'>
                Menu Items
            </h1>
            <div className='space-y-5 w-full lg:w-[92vw] pt-12 pb-10'>
                <Paper elevation={3}
                    sx={{
                        borderRadius: '3px'
                    }}>
                    <TableContainer>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell colSpan={6}></TableCell>
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
                                {menu.menuItems
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((row) => {
                                        return (
                                            <TableRow sx={{ cursor: "pointer" }} hover tabIndex={-1}>
                                                <TableCell align='left'>
                                                    <img className='w-[5rem] h-[5rem] object-cover'
                                                        src={row.images[0]} />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.name}
                                                </TableCell>
                                                <TableCell align='left'>
                                                    {row.description}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    <img className='w-[2rem] h-[2rem] items-center object-cover'
                                                        src={row.vegetarian ? "https://openclipart.org/image/800px/304248" : "https://freesvg.org/img/1531813245.png"} />
                                                </TableCell>
                                                <TableCell align='center'>
                                                    ₹ {row.price}
                                                </TableCell>
                                                <TableCell align='center'>
                                                    {row.menuCategory.name}
                                                </TableCell>
                                                <TableCell>
                                                    <Tooltip title="Edit">
                                                        <IconButton onClick={() => handleEditOnClick(row)}>
                                                            <EditIcon />
                                                        </IconButton>
                                                    </Tooltip>
                                                    <Tooltip title="Delete">
                                                        <IconButton onClick={() => handleDeleteOnClick(row)}>
                                                            <DeleteIcon />
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
                        count={menu.menuItems.length}
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
                            Add Menu Item
                        </Typography>
                        <div className='pt-5 flex flex-wrap gap-5 text-center'>
                            <Button
                                component="label"
                                variant="contained"
                                tabIndex={-1}
                                startIcon={<AddPhotoAlternateIcon />}
                                className='w-16 h-16'
                                style={{ backgroundColor: 'white', color: pink[900], border: '2px solid #f06292' }}
                            >
                                <VisuallyHiddenInput
                                    type="file"
                                    accept='image/*'
                                    onChange={(e) => handleImageUpload(e)}
                                />
                            </Button>
                            <div className='flex flex-wrap gap-2'>
                                {
                                    menuItemImageUrl !== "" ?
                                        (<img className='w-24 h-24 object-cover' src={menuItemImageUrl}></img>)
                                        : ("")
                                }
                            </div>
                        </div>
                        <Formik onSubmit={handleAddNewItemSubmit}
                            initialValues={{
                                name: "",
                                description: "",
                                menuCategoryName: "",
                                isVegetarian: true,
                                price: 0
                            }}
                            validationSchema={MenuItemSchema}>
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
                                        fullWidth
                                        variant="standard"
                                        multiline
                                        sx={{ mt: 2 }}></Field>
                                    <Field
                                        as={TextField}
                                        name="price"
                                        label="Price"
                                        fullWidth
                                        variant="standard"
                                        sx={{ mt: 2 }}></Field>
                                    {errors.price && touched.price ? (
                                        <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.price}</div>
                                    ) : null}
                                    <FormControlLabel
                                        label="Vegetarian"
                                        className='mt-5 ml-3'
                                        control={
                                            <Field
                                                component={Checkbox}
                                                type="checkbox"
                                                name="isVegetarian"
                                                label='Vegetarian'
                                                onClick={(e) => isVegetarian = e.target.checked}
                                                sx={{
                                                    mt: 1, color: pink[900],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}></Field>
                                        }
                                    />
                                    <Field
                                        as={Select}
                                        labelId="menu-category-label-id"
                                        name="menuCategoryName"
                                        label="Menu Category"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        variant="standard"
                                    >
                                        {restaurant.menuCategories.map(
                                            (item) => (<MenuItem value={item.name}>{item.name}</MenuItem>)
                                        )}
                                    </Field>
                                    {errors.menuCategoryName && touched.menuCategoryName ? (
                                        <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.menuCategoryName}</div>
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
                            Update Menu Item
                        </Typography>
                        <Formik onSubmit={handleEditMenuItemSubmit}
                            initialValues={{
                                name: menuItemValues.name,
                                description: menuItemValues.description,
                                menuCategoryName: menuItemValues.menuCategory.name,
                                isVegetarian: menuItemValues.isVegetarian,
                                price: menuItemValues.price
                            }}
                            enableReinitialize
                            validationSchema={MenuItemSchema}>
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
                                        fullWidth
                                        variant="standard"
                                        multiline
                                        sx={{ mt: 2 }}></Field>
                                    <Field
                                        as={TextField}
                                        name="price"
                                        label="Price"
                                        fullWidth
                                        variant="standard"
                                        sx={{ mt: 2 }}></Field>
                                    {errors.price && touched.price ? (
                                        <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.price}</div>
                                    ) : null}

                                    <FormControlLabel
                                        label="Vegetarian"
                                        className='mt-5 ml-3'
                                        control={
                                            <Field
                                                component={Checkbox}
                                                type="checkbox"
                                                name="isVegetarian"
                                                label='Vegetarian'
                                                defaultChecked={menuItemValues.isVegetarian}
                                                onClick={(e) => menuItemValues.isVegetarian = e.target.checked}
                                                sx={{
                                                    mt: 1, color: pink[900],
                                                    '&.Mui-checked': {
                                                        color: pink[600],
                                                    },
                                                }}></Field>
                                        }
                                    />
                                    <Field
                                        as={Select}
                                        labelId="menu-category-label-id"
                                        name="menuCategoryName"
                                        label="Menu Category"
                                        fullWidth
                                        sx={{ mt: 2 }}
                                        variant="standard"
                                        defaultValue={menuItemValues.menuCategory.name}
                                    >
                                        {restaurant.menuCategories.map(
                                            (item) => (<MenuItem value={item.name}>{item.name}</MenuItem>)
                                        )}
                                    </Field>
                                    {errors.menuCategoryName && touched.menuCategoryName ? (
                                        <div className='text-red-700' style={{ fontSize: '0.8rem' }}>{errors.menuCategoryName}</div>
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

export default RestaurantMenuItem