import ProductSkelaton from '@/components/Skelaton/ProductSkelaton'
import React from 'react'

const loading = () => {
  return (
<div className='grid md:grid-cols-3 grid-cols-1 gap-5 mb-20 px-16'>
       {
        [...Array(9)].map((_,index)=>(
          <ProductSkelaton key={index}></ProductSkelaton>
        ))
       }
    </div>
  )
}

export default loading