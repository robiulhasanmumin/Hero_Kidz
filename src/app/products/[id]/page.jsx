import { getSingleProduct } from "@/actions/server/product";
import CartButton from "@/components/buttons/CartButton";
import Image from "next/image";
import React from "react";
import { FaStar, FaCartPlus, FaCheckCircle, FaTruck, FaShieldAlt } from "react-icons/fa";
 
export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = await getSingleProduct(id);

  if (!product) {
    return { title: "Product Not Found" };
  }

  return {
    title: product.title,
    description: product.description.slice(0, 160),
    openGraph: {
      title: `${product.title} - Hero Kidz`,
      description: `মাত্র ৳${product.price} টাকায় কিনুন ${product.title}`,
      url: `https://hero-kidz.vercel.app/product/${id}`,
      images: [
        {
          url: product.image || "https://i.ibb.co.com/zVJRMzsJ/image.png", // প্রোডাক্ট ইমেজ না থাকলে প্রিভিউ ইমেজ দেখাবে
          width: 800,
          height: 600,
          alt: product.title,
        },
      ],
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      images: [product.image],
    },
  };
}




const ProductDetails = async ({params}) => {
  const {id} = await params
  const product = await getSingleProduct(id)  

  const { title, bangla, image, price, discount, description, ratings, reviews, sold, info } = product;
  const discountedPrice = price - (price * discount) / 100;

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Left: Product Image */}
        <div className="bg-base-200 rounded-3xl p-8 flex justify-center md:sticky top-24">
          <Image
            height={200}
            width={400}
            src={image} 
            alt={title} 
            className="rounded-2xl max-h-[500px] object-contain hover:scale-105 transition-transform duration-500" 
          />
        </div>

        {/* Right: Product Info */}
        <div className="space-y-6">
          <div>
            <div className="badge badge-primary mb-2">Popular Choice</div>
            <h1 className="text-3xl md:text-4xl font-bold text-base-content">{title}</h1>
            <p className="text-xl text-primary font-medium mt-1">{bangla}</p>
          </div>

          {/* Rating & Sold Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center text-orange-400 gap-1">
              <FaStar />
              <span className="font-bold text-lg">{ratings}</span>
              <span className="text-gray-400 text-sm">({reviews} Reviews)</span>
            </div>
            <div className="divider divider-horizontal"></div>
            <div className="flex items-center gap-1 text-success font-semibold">
              <FaCheckCircle /> {sold} Sold
            </div>
          </div>

          {/* Pricing */}
          <div className="bg-base-200 p-6 rounded-2xl flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wider">Price</p>
              <div className="flex items-center gap-3">
                <span className="text-4xl font-extrabold text-primary">৳{discountedPrice}</span>
                {discount > 0 && (
                  <span className="text-xl line-through text-gray-400">৳{price}</span>
                )}
              </div>
            </div>
            {discount > 0 && (
              <div className="badge badge-error badge-lg text-white font-bold p-4">
                {discount}% OFF
              </div>
            )}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg font-bold mb-2">Description</h3>
            <p className="text-gray-600 leading-relaxed whitespace-pre-line">
              {description}
            </p>
          </div>

          {/* Key Features (Info Array) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {info?.map((item, idx) => (
              <div key={idx} className="flex items-center gap-2 text-sm text-base-content/80">
                <FaCheckCircle className="text-primary" /> {item}
              </div>
            ))}
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col gap-4 pt-6">
            <CartButton product={product}></CartButton>
             <button className="btn btn-outline btn-primary">Buy Now</button>
          </div>

          {/* Trust Badges */}
          <div className="flex justify-between p-4 border-t border-base-300 mt-6">
            <div className="flex items-center gap-2 text-xs font-medium"><FaTruck /> Fast Delivery</div>
            <div className="flex items-center gap-2 text-xs font-medium"><FaShieldAlt /> 100% Original</div>
            <div className="flex items-center gap-2 text-xs font-medium"><FaCheckCircle /> Child Safe</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;