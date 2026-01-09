"use client";
import { FaStar, FaShoppingCart, FaCheckCircle } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import CartButton from "../buttons/CartButton";

const ProductCard = ({ product }) => {

  const {_id, title, bangla, image, price, discount, ratings, reviews, sold } = product;
  
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="card card-compact bg-base-100 w-full shadow-xl border border-base-200 hover:shadow-2xl transition-all duration-300 group">
      {/* Product Image */}
      <figure className="relative h-64 overflow-hidden bg-gray-100">
        <Image
          src={image}
          alt={title}
          width={200}
          height={180}
          className="w-full h-full group-hover:scale-110 transition-transform duration-500"
        />
        {discount > 0 && (
          <div className="absolute top-2 left-2 badge badge-error text-white font-bold p-3">
            -{discount}%
          </div>
        )}
      </figure>

      {/* Card Body */}
      <div className="card-body">
        {/* Title */}
        <h2 className="card-title text-lg leading-tight line-clamp-1 group-hover:text-primary transition-colors">
          {title}
        </h2>
        <p className="text-sm text-gray-500 font-medium">{bangla}</p>

        {/* Rating & Review */}
        <div className="flex items-center gap-2 mt-1">
          <div className="flex items-center text-orange-400">
            <FaStar size={14} />
            <span className="ml-1 text-sm font-bold text-base-content">{ratings}</span>
          </div>
          <div className="text-xs text-gray-400">({reviews} reviews)</div>
          <div className="divider divider-horizontal mx-0"></div>
          <div className="flex items-center gap-1 text-xs text-success font-semibold">
             <FaCheckCircle /> {sold} Sold
          </div>
        </div>

        {/* Price Section */}
        <div className="flex items-baseline gap-2 mt-3">
          <span className="text-2xl font-bold text-primary">৳{discountedPrice}</span>
          {discount > 0 && (
            <span className="text-sm line-through text-gray-400">৳{price}</span>
          )}
        </div>

        {/* Action Button */}
        <div className="card-actions mt-4">
          <CartButton product={{...product,_id:_id.toString()}}></CartButton>
          <Link className="btn btn-primary btn-outline btn-block" href={`/products/${_id}`} >View Details</Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;