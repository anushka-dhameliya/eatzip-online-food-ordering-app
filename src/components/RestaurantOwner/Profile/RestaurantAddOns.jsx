import React, { useEffect, useState } from 'react'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { pink } from '@mui/material/colors';
import { Field, Form, Formik } from 'formik';
import { Button, Checkbox, Chip, Dialog, DialogContent, FormControlLabel, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TextField, Tooltip, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch, useSelector } from 'react-redux';
import { createAddOnItem, deleteAddOnItem, getAddOnItemsByRestaurantId, updateAddOnItem, updateAddOnItemStatus } from '../../State/RestaurantOwner/Menu/Action';



const columns = [
  {
    id: 'name',
    label: 'Name',
    align: 'center',
    minWidth: 250
  },
  {
    id: 'price',
    label: 'Price',
    align: 'center',
    minWidth: 50
  },
  {
    id: 'inStock',
    label: 'In Stock',
    align: 'center',
    minWidth: 150
  }
];

const RestaurantAddOns = () => {

  const dispatch = useDispatch();
  const jwtToken = localStorage.getItem("jwtToken");
  const { restaurant, menu } = useSelector(store => store);

  useEffect(() => {
    if (jwtToken !== null && jwtToken !== undefined) {
      dispatch(getAddOnItemsByRestaurantId({ jwtToken: jwtToken, restaurantId: restaurant.usersRestaurant?.id }));
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



  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  var inStock = false;

  const handleAddNewAddOnItemSubmit = (values) => {
    console.log("new Add-on item : ", values);
    const newAddOnItem = {
      name: values.name,
      price: values.price,
      inStock: inStock,
      restaurantId: restaurant.usersRestaurant.id
    };
    console.log("new Add-on item to send : ", newAddOnItem);
    dispatch(createAddOnItem({ jwtToken, addOnItemData: newAddOnItem }));
    handleClose();
  }

  var [addOnItemValues, setAddOnItemValues] = useState({
    id: 0,
    name: "",
    price: 0,
    inStock: false
  });

  const handleEditOnClick = (values) => {
    addOnItemValues.id = values.id;
    addOnItemValues.name = values.name;
    addOnItemValues.price = values.price;
    addOnItemValues.inStock = values.inStock;
    setAddOnItemValues(addOnItemValues);
    handleEditClickOpen();
  }

  const [editOpen, setEditOpen] = useState(false);

  const handleEditClickOpen = () => {
    setEditOpen(true);
  };

  const handleEditClose = () => {
    setEditOpen(false);
  };

  const handleEditAddOnItemSubmit = (values) => {
    console.log("update add-on item : ", values);
    const editAddOnItem = {
      id: addOnItemValues.id,
      name: values.name,
      price: values.price,
      inStock: values.inStock,
      restaurantId: restaurant.usersRestaurant.id
    };
    dispatch(updateAddOnItem({ jwtToken, addOnItemId: addOnItemValues.id, addOnItemData: editAddOnItem }));
    handleEditClose();
  }

  const handleDeleteOnClick = (values) => {
    dispatch(deleteAddOnItem({ jwtToken, addOnItemId: values.id }));
  }

  const handleAddOnItemStatusSubmit = (values) => {
    dispatch(updateAddOnItemStatus({ jwtToken, addOnItemId: values.id }));
  }

  return (
    <div className='px-10'>
      <h1 className='mt-3 text-xl lg:text-4xl text-center py-7 font-semibold ml-[15vw]'>
        Add-Ons
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
                  <TableCell colSpan={3}></TableCell>
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
                      style={{ top: 0, width: column.minWidth }}
                    >
                      <Typography className='text-semibold'>{column.label}</Typography>
                    </TableCell>
                  ))}
                  <TableCell
                    align='right'
                    style={{ top: 0, width: 50 }}
                  >
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {menu.addOnItems
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row) => {
                    return (
                      <TableRow sx={{ cursor: "pointer" }} hover tabIndex={-1} key={row.code}>
                        <TableCell align="center" style={{ top: 0, width: 250 }}>
                          {row.name}
                        </TableCell>
                        <TableCell align='center' style={{ top: 0, width: 50 }}>
                          ₹ {row.price}
                        </TableCell>
                        <TableCell align='center' style={{ top: 0, width: 150 }}>
                          <Chip onClick={() => handleAddOnItemStatusSubmit(row)} label={row.inStock ? "Yes" : "No"} color={row.inStock ? "success" : "error"} />
                        </TableCell>
                        <TableCell style={{ top: 0, width: 50 }}>
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
            count={menu.addOnItems.length}
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
              New Add-Ons
            </Typography>
            <Formik
              onSubmit={handleAddNewAddOnItemSubmit}
              initialValues={{
                name: "",
                price: 0,
                inStock: false
              }}>
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  sx={{ mt: 2 }}></Field>
                <Field
                  as={TextField}
                  name="price"
                  label="Price"
                  fullWidth
                  variant="standard"
                  sx={{ mt: 2 }}></Field>
                <FormControlLabel
                  label="In Stock"
                  className='mt-5 ml-3'
                  control={
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      name="inStock"
                      label='In Stock'
                      onClick={(e) => inStock = e.target.checked}
                      sx={{
                        mt: 1, color: pink[900],
                        '&.Mui-checked': {
                          color: pink[600],
                        },
                      }}></Field>
                  }
                />
                <Button sx={{ mt: 3, padding: '1rem' }} fullWidth type='submit' variant='contained'>Save</Button>
              </Form>
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
              Update Add-Ons
            </Typography>
            <Formik
              enableReinitialize
              onSubmit={handleEditAddOnItemSubmit}
              initialValues={{
                name: addOnItemValues.name,
                price: addOnItemValues.price,
                inStock: addOnItemValues.inStock
              }}>
              <Form>
                <Field
                  as={TextField}
                  name="name"
                  label="Name"
                  fullWidth
                  variant="standard"
                  sx={{ mt: 2 }}></Field>
                <Field
                  as={TextField}
                  name="price"
                  label="Price"
                  fullWidth
                  variant="standard"
                  sx={{ mt: 2 }}></Field>
                <FormControlLabel
                  label="In Stock"
                  className='mt-5 ml-3'
                  control={
                    <Field
                      component={Checkbox}
                      type="checkbox"
                      name="inStock"
                      label='In Stock'
                      defaultChecked={addOnItemValues.inStock}
                      onClick={(e) => addOnItemValues.inStock = e.target.checked}
                      sx={{
                        mt: 1, color: pink[900],
                        '&.Mui-checked': {
                          color: pink[600],
                        },
                      }}></Field>
                  }
                />
                <Button sx={{ mt: 3, padding: '1rem' }} fullWidth type='submit' variant='contained'>Save</Button>
              </Form>
            </Formik>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default RestaurantAddOns