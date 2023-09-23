import React, { Fragment } from 'react'
import { Product } from '../../app/models/product';

interface Props{
    products:Product[];
    addProduct:()=>void;
  }

export default function Catalog({products,addProduct}:Props) {
    return (
        <>
            <ul>
                {products.map((products) => (
                    <li key={products.id}>{products.name}-{products.price}</li>
                ))}
            </ul>
            <button onClick={addProduct}> add products</button>
        </>
    )
}
