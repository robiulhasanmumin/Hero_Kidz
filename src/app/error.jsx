"use client"; // এরর পেজ অবশ্যই ক্লায়েন্ট কম্পোনেন্ট হতে হবে
import Link from "next/link";
import React, { useEffect } from "react";
import { BiRefresh } from "react-icons/bi";

export default function Error({ error, reset }) {
  useEffect(() => {
    // এররটি কনসোলে লগ করে রাখা ভালো
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      {/* এরর আইকন */}
      <div className="bg-error/10 p-6 rounded-full mb-6">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-error" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>

      <h2 className="text-3xl font-bold text-base-content mb-2">কিছু একটা ভুল হয়েছে!</h2>
      <p className="text-gray-500 max-w-md mb-8">
        দুঃখিত, পেজটি লোড করার সময় একটি ইন্টারনাল এরর ঘটেছে। দয়া করে আবার চেষ্টা করুন।
      </p>

      <div className="flex gap-4">
        {/* রিস্টার্ট বাটন */}
        <button
          onClick={() => reset()}
          className="btn btn-error text-white gap-2 px-8"
        >
          <BiRefresh size={24} /> আবার চেষ্টা করুন
        </button>
        
        <Link href={"/"} className="btn btn-outline">
          হোমে ফিরে যান
        </Link>
      </div>
    </div>
  );
}