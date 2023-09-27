import React, { Fragment, useEffect, useState } from 'react'
import { Product } from '../../app/models/product';
import { Avatar, Button, List, ListItem, ListItemAvatar, ListItemText } from '@mui/material';
import ProductList from './ProductList';
import agent from "../../app/api/agent";
import LoadingComponent from '../../app/layout/LoadingComponent';
import { error } from 'console';

export default function Catalog() {
    const[products,setProducts]=useState<Product[]>([]);
    const[loading,setLoading]=useState(true);

    /**
     * fetch the products dtat from .net web api 
     */
    useEffect(()=>{
      agent.Catalog.list().then(products=>setProducts(products))
      .catch(error=>console.log(error))
      .finally(()=> setLoading(false))
    },[])
    
    if (loading) return<LoadingComponent message='Loading products...'/>

    return (
        <>
           <ProductList products={products}></ProductList>

        </>
    )
}
