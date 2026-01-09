import { ProductDetailsSkeleton } from '@/components/Skelaton/ProductDetailsSkelaton'
import React from 'react'

const loading = () => {
  return (
<div className="grid grid-cols-1 gap-12 items-start">
       {
        [...Array(9)].map((_,index)=>(
          <ProductDetailsSkeleton key={index}></ProductDetailsSkeleton>
        ))
       }
    </div>
  )
}

export default loading