import React from 'react'

const ProductSkelaton = () => {
  return (
<div className="card card-compact bg-base-100 w-full max-w-sm shadow-md border border-base-200">
      {/* Image Skeleton */}
      <div className="skeleton h-64 w-full rounded-b-none"></div>
      
      <div className="card-body gap-3">
        {/* Title Skeleton */}
        <div className="skeleton h-6 w-3/4"></div>
        <div className="skeleton h-4 w-1/2"></div>

        {/* Rating Skeleton */}
        <div className="flex gap-2">
          <div className="skeleton h-4 w-12"></div>
          <div className="skeleton h-4 w-20"></div>
        </div>

        {/* Price Skeleton */}
        <div className="skeleton h-8 w-24 mt-2"></div>

        {/* Button Skeleton */}
        <div className="skeleton h-12 w-full mt-2"></div>
      </div>
    </div>
    
  )
}

export default ProductSkelaton