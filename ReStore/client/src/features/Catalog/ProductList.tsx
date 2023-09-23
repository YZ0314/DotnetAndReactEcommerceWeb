import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { Product } from '../../app/models/product'
import ProductCard from './ProductCard'
 
interface Props{
    products:Product[]
}
export default function ProductList({products}:Props) {
  return (
    <div>
         <Grid container spacing={4}>
                {products.map((products) => (
                    <Grid item xs={3}><ProductCard key={products.id} products={products}></ProductCard></Grid>
                ))}
            </Grid>
    </div>
  )
}
