import React, { useEffect, useState } from 'react'
import { Basket } from '../../app/models/basket';
import agent from '../../app/api/agent';
import { error } from 'console';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Delete } from '@mui/icons-material';
import { useStoreContext } from '../../app/context/StoreContext';

export default function BasketPage() {
  const {basket}=useStoreContext();


  if(!basket) return <Typography variant='h3'>Your Basket Is Empty</Typography>

  return (
    <>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="right">Quantity</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {basket.items.map((item) => (
            <TableRow
              key={item.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.name}
              </TableCell>
              <TableCell align="right">{(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="right">{item.quantity}</TableCell>
              <TableCell align="right">{((item.price/100) *item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right"><IconButton color='error'><Delete/></IconButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </>
  )
}
