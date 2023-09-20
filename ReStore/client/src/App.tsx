import React, { useEffect, useState } from 'react'

export default function App() {
  const[products,setProducts]=useState();

  /**
   * fetch the products dtat from .net web api 
   */
  useEffect(()=>{
    fetch('http://localhost:5000/api/Products')
    .then(Response=>Response.json())
    .then(data=>setProducts(data))
  },[])


  return (
    <div>
      <h1>
        Re-Store
      </h1>
    </div>
    
  )
}
