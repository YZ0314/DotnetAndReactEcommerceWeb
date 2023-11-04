import { Avatar, Grid, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material'
import React from 'react'
import { Product } from '../../app/models/product'
import ProductCard from './ProductCard'
import { useAppSelector } from '../../app/store/configureStore'
import ProductCardSkeleton from './ProductCardSkeleton'
 
interface Props{
    products:Product[]
}
export default function ProductList({products}:Props) {
  const{productsLoaded} =useAppSelector(state=> state.catalog)
  return (
    <div>
         <Grid container spacing={4}>
                {products.map((products) =>(
                          
                    <Grid item xs={4} key={products.id}>
                      {!productsLoaded ?(
                        <ProductCardSkeleton/> 
                      ):( <ProductCard key={products.id} products={products}></ProductCard>)
                       
                      }
</Grid>
                ))}
            </Grid>
    </div>
  )
}
