import React, { useEffect, useState } from 'react'
import { Basket } from '../../app/models/basket';
import agent from '../../app/api/agent';
import { error } from 'console';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { Box, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Add, Delete, Remove } from '@mui/icons-material';
import { useStoreContext } from '../../app/context/StoreContext';
import { it } from 'node:test';
import { LoadingButton } from '@mui/lab';

export default function BasketPage() {
  const {basket,setBasket,removeItem}=useStoreContext();
  const [status,setStatus]=useState({
    loading:false,
    name:'',
  });
  function handleAddItem(productId:number,name:string){
    setStatus({
      loading:true,
      name:name, 
    })
    agent.Basket.addItem(productId,1)
    .then(basket=>setBasket(basket))
    .catch(error=> console.log(error))
    .finally(()=>setStatus({
      loading:false,
      name:name, 
    }))

  }

  function handleRemoveItem(productId:number,quantity:number,name:string){
    setStatus({
      loading:true,
     name:name,
    })
    agent.Basket.removeItem(productId,quantity)
    .then(basket=>removeItem(productId,quantity))
    .catch(error=>console.log(error))
    .finally(()=> setStatus({
      loading:false,
      name:name, 
    }))
  }


  if(!basket) return <Typography variant='h3'>Your Basket Is Empty</Typography>

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
                <Box display={'flex'} alignItems={'center'}>
                  <img src={item.pictureUrl} alt={item.name} style={{height:50,marginRight:20}}/>
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">{(item.price/100).toFixed(2)}</TableCell>
              <TableCell align="center">
                <LoadingButton loading={status.loading&&status.name==='remove'+item.productId} onClick={()=>handleRemoveItem(item.productId,1,'remove'+item.productId)} color='primary'>
                  <Remove/>
                </LoadingButton>
                {item.quantity}
                <LoadingButton loading={status.loading&&status.name==='add'+item.productId} onClick={()=>handleAddItem(item.productId,'add'+item.productId)}color='primary'>
                  <Add/>
                </LoadingButton>
              </TableCell>
              <TableCell align="right">{((item.price/100) *item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right"><LoadingButton loading={status.loading&&status.name==='delete'+item.productId} onClick={()=>handleRemoveItem(item.productId,item.quantity,'delete'+item.productId)}color='error'><Delete/></LoadingButton></TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
    </TableContainer>
    </>
  )
}