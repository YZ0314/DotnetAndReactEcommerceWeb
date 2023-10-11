import { useEffect } from 'react'
import ProductList from './ProductList';
import LoadingComponent from '../../app/layout/LoadingComponent';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchProductsAsync, productSelectors } from './catalogSlice';
import { Product } from '../../app/models/product';

export default function Catalog() {
   const products=useAppSelector(productSelectors.selectAll)
   const {productsLoaded,status}=useAppSelector(state=>state.catalog)
   const dispatch=useAppDispatch();


    /**
     * fetch the products dtat from .net web api 
     */
    useEffect(()=>{
      if(!productsLoaded) dispatch(fetchProductsAsync())
    },[productsLoaded,dispatch])
    
    if (status.includes('pending')) return<LoadingComponent message='Loading products...'/>

    return (
        <>
           <ProductList products={products as Product[]}></ProductList>

        </>
    )
}
