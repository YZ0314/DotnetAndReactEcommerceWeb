import React, { Fragment, useEffect, useState } from 'react'
import { Product } from '../../app/models/product';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ProductList from './ProductList';
import agent from "../../app/api/agent";

export default function Catalog() {
    const[products,setProducts]=useState<Product[]>([]);

    /**
     * fetch the products dtat from .net web api 
     */
    useEffect(()=>{
      agent.Catalog.list().then(products=>setProducts(products))
    },[])
    

    return (
        <>
           <ProductList products={products}></ProductList>

        </>
    )
}
