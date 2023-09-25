import React, { Fragment, useEffect, useState } from 'react'
import { Product } from '../../app/models/product';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ProductList from './ProductList';


export default function Catalog() {
    const[products,setProducts]=useState<Product[]>([]);

    /**
     * fetch the products dtat from .net web api 
     */
    useEffect(()=>{
      fetch('http://localhost:5000/api/Products')
      .then(Response=>Response.json())
      .then(data=>setProducts(data))
    },[])
    

    return (
        <>
           <ProductList products={products}></ProductList>

        </>
    )
}
