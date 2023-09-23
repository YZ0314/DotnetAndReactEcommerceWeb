import React, { useEffect, useState } from 'react'
import { Product } from '../models/product';
import Catalog from '../../features/Catalog/Catalog';





export default function App() {
  const[products,setProducts]=useState<Product[]>([]);

  /**
   * fetch the products dtat from .net web api 
   */
  useEffect(()=>{
    fetch('http://localhost:5000/api/Products')
    .then(Response=>Response.json())
    .then(data=>setProducts(data))
  },[])

  function addProduct(){
    setProducts(prevState =>[...prevState,{
      id:prevState.length+101,
      name:'product'+(prevState.length+1),
      price:(prevState.length*100)+100,
      brand:'some brand',
      description:'some',
      pictureUrl:'http://picsum.photos/200'
  }])
    
  }


  return (
    <div>
      <h1>
        Re-Store
      </h1>
      <Catalog products={products} addProduct={addProduct}/>
    </div>
    
  )
}
