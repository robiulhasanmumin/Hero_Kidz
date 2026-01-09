import Link from 'next/link';
import React from 'react';
import { FaHome, FaExclamationTriangle } from 'react-icons/fa';

const NotFoundPage = () => {
  return (
    <div className="min-h-[80-screen] flex items-center justify-center px-4 py-20 bg-base-100">
      <div className="text-center">
        {/* Animated Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <FaExclamationTriangle className="text-9xl text-warning animate-pulse" />
            <span className="absolute inset-0 flex items-center justify-center text-3xl font-bold text-base-100 mt-4">
              404
            </span>
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-4xl md:text-6xl font-extrabold text-base-content mb-4">
          Oops! Page Not Found
        </h1>
        <p className="text-lg text-base-content/70 max-w-md mx-auto mb-8">
          আপনি যে পেজটি খুঁজছেন তা হয়তো ডিলিট করা হয়েছে অথবা ভুল লিংকে প্রবেশ করেছেন। 
          দয়া করে আবার চেক করুন অথবা হোমপেজে ফিরে যান।
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/" className="btn btn-primary btn-lg gap-2">
            <FaHome className="text-xl" /> Back to Home
          </Link>
          <Link href="/contact" className="btn btn-outline btn-lg">
            Report Issue
          </Link>
        </div>

        {/* Quick Links (Optional) */}
        <div className="mt-12">
          <p className="text-sm font-semibold uppercase tracking-widest text-base-content/40 mb-4">
            Popular Links
          </p>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-medium">
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <Link href="/blog" className="hover:text-primary transition-colors">Blog</Link>
            <Link href="/cart" className="hover:text-primary transition-colors">Shopping Cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFoundPage;