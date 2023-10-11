import React, { useEffect, useState } from 'react'
import { Basket } from '../../app/models/basket';
import agent from '../../app/api/agent';
import { error } from 'console';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useStoreContext } from '../../app/context/StoreContext';
import { it } from 'node:test';
import { LoadingButton } from '@mui/lab';
import BasketSummary from './BasketSummery';
import { currencyFormat } from '../../app/util/util';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addBasketItemAsync, removeBasketItemAsync, setBasket } from './BasketSlice';

export default function BasketPage() {
  const{basket,status}=useAppSelector(state=>state.basket)
  const dispatch=useAppDispatch();



  if (!basket || basket.items.length===0) return <Typography variant='h3'>Your Basket Is Empty</Typography>

  return (
    <>
    
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Subtotal</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {basket.items.map((item) => (
              <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  <Box display={'flex'} alignItems={'center'}>
                    <img src={item.pictureUrl} alt={item.name} style={{ height: 50, marginRight: 20 }} />
                    <span>{item.name}</span>
                  </Box>
                </TableCell>
                <TableCell align="right">{(item.price / 100).toFixed(2)}</TableCell>
                <TableCell align="center">
                  <LoadingButton loading={status===('pendingRemoveItem'+item.productId)} 
                  onClick={() => dispatch(removeBasketItemAsync({productId:item.productId}))} color='primary'>
                    <Remove />
                  </LoadingButton>
                  {item.quantity}
                  <LoadingButton loading={status===('pendingAdditem'+item.productId)} 
                  onClick={() => dispatch(addBasketItemAsync({productId:item.productId}))} color='primary'>
                    <Add />
                  </LoadingButton>
                </TableCell>
                <TableCell align="right">{currencyFormat(item.price*item.quantity)}</TableCell>
                <TableCell align="right">
                  <LoadingButton loading={status===('pendingDeleteItem'+item.productId)} 
                  onClick={() =>dispatch(removeBasketItemAsync({productId:item.productId,quantity:item.quantity}))} color='error'><Delete /></LoadingButton></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </TableContainer>
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          <BasketSummary />
          <Button 
          component={Link}
          to='/checkout'
          variant='contained'
          size='large'
          fullWidth
          sx={{marginTop:'20px'}}
          > Checkout</Button>
        </Grid>

      </Grid>
    
    </>
  )
}