import React from 'react'
import ProductCard from '../card/ProductCard'
import { getProducts } from '@/actions/server/product'

const Products = async () => {
  const products = (await getProducts()) || [];
  return (
    <div>
      <h2 className='text-4xl font-bold text-center mb-10'>
      Our <span className='text-primary'>Products</span> 
      </h2>

<div className='grid md:grid-cols-3 grid-cols-1 gap-5 mb-20 px-16'>

      {
        products.map(product=><ProductCard key={product.title} product={product}></ProductCard>)
      }
</div>
    </div>
  )
}

export default Products