import { Divider, Grid, Table, TableBody, TableCell, TableContainer, TableRow, TextField, Typography } from '@mui/material'
import axios from 'axios';
import React, {useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Product } from '../../app/models/product';
import { error } from 'console';
import agent from '../../app/api/agent';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useStoreContext } from '../../app/context/StoreContext';
import { LoadingButton } from '@mui/lab';

export default function ProductDetails() {
  const {basket,setBasket,removeItem}=useStoreContext();
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const[quantity,setQuantity]=useState(0);
  const [submitting,setSubmitting]=useState(false);
  const item=basket?.items.find(i=>i.productId===product?.id)
  useEffect(() => {
    if(item) setQuantity(item.quantity);
    id && agent.Catalog.details(parseInt(id))
    .then(response=>setProduct(response))
    .catch(error=>console.log(error))
    .finally(()=> setLoading(false))
  }, [id,item]);

  function handleInputChange(event:React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>){
    if(parseInt(event.currentTarget.value)>=0){setQuantity(parseInt(event.currentTarget.value));}
   
  }

  function handleUpdateCart(){
    setSubmitting(true);
    if(!item|| quantity>item.quantity){
      const updatedQuantity=item?quantity-item.quantity:quantity;
      agent.Basket.addItem(product?.id!,updatedQuantity)
      .then(basket=>setBasket(basket))
      .catch(error=>console.log(error))
      .finally(()=>setSubmitting(false))
    }
    else{
      const updatedQuantity=item.quantity-quantity;
      agent.Basket.removeItem(product?.id!,updatedQuantity)
      .then(()=>removeItem(product?.id!,updatedQuantity))
      .catch(error=>console.log(error))
      .finally(()=>setSubmitting(false))
    }

  }

  if (loading) return <LoadingComponent message='Loading product...'/>
  if (!product) {
    return <h3>Product not found</h3>
  }

  return (
    <Grid container spacing={6}>
      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{ width: '100%' }} />
      </Grid>

      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>
        <Divider sx={{ mb: 2, mt: 2 }} />
        <Typography variant='h4' color='secondary'>{(product.price / 100).toFixed(2)}</Typography>
        <TableContainer>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Grid container spacing={2} sx={{marginTop:'20px'}}>
          <Grid item xs={6} >
            <TextField 
            type='number'
            variant='outlined' 
            label='Quantity in Cart'
            fullWidth
            value={quantity}
            onChange={handleInputChange}
            ></TextField>
          </Grid>
          <Grid item xs={6} >
            <LoadingButton sx={{height:'55px'}}
            color='primary'
            size='large'
            variant='contained'
            fullWidth
            loading={submitting}
            onClick={handleUpdateCart}
            disabled={item?.quantity===quantity || !item&&quantity===0}
            >
              {item ?'Updtate Quantity':'Add to Cart'}
            </LoadingButton>
          </Grid>
        </Grid>

      </Grid>
    </Grid>
  )
}
