"use client";

import { createOrder } from "@/actions/server/Order";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { AiOutlineLoading } from "react-icons/ai";
import Swal from "sweetalert2";

const CheckOut = ({ cartItems = [] }) => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // কার্টের মোট আইটেম সংখ্যা বের করা
  const totalItems = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity, 0),
    [cartItems]
  );

  // কার্টের মোট দাম বের করা
  const totalPrice = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0),
    [cartItems]
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    // ১. প্রয়োজনীয় সব ডাটা নিয়ে পে-লোড তৈরি
    const payload = {
      name: session?.user?.name,
      email: session?.user?.email,
      contact: form.contactNo.value,
      address: form.deliveryInfo.value,
      instruction: form.specialInstruction.value,
      items: cartItems, // কার্টের প্রোডাক্টগুলো পাঠানো হচ্ছে
      totalPrice: totalPrice, // মোট দাম পাঠানো হচ্ছে
    };

    try {
      const result = await createOrder(payload);

      if (result.success) {
        // ২. সফল হলে SweetAlert দেখিয়ে তারপর রিডাইরেক্ট
        Swal.fire({
          title: "অর্ডার সম্পন্ন হলো!",
          text: "অর্ডার টি ৭ দিনের ভেতর আপনার কাছে পৌছে যাবে। ইমেইল চেক করুন।",
          icon: "success",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "ঠিক আছে",
        }).then((res) => {
          // ইউজার ওকে বাটনে ক্লিক করলে হোম পেজে নিয়ে যাবে
          if (res.isConfirmed || res.isDismissed) {
            router.push("/");
            router.refresh();
          }
        });
      } else {
        // যদি ডাটাবেসে সেভ না হয়
        Swal.fire({
          title: "দুঃখিত!",
          text: result.message || "অর্ডারটি নেওয়া সম্ভব হয়নি। আবার চেষ্টা করুন।",
          icon: "error",
        });
      }
    } catch (error) {
      console.error("Checkout Error:", error);
      Swal.fire("ভুল হয়েছে!", "সার্ভারের সাথে যোগাযোগ করা যাচ্ছে না।", "error");
    } finally {
      setLoading(false);
    }
  };

  // সেশন লোড হওয়ার সময় লোডিং দেখানো
  if (status === "loading") {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <h2 className="text-2xl font-bold text-primary animate-pulse">Loading CheckOut...</h2>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 relative">
      {/* ৩. প্রসেসিং ওভারলে (লোডিং অবস্থায় দেখাবে) */}
      {loading && (
        <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-black/40 backdrop-blur-sm text-white">
          <AiOutlineLoading size={60} className="animate-spin mb-4 text-primary" />
          <h2 className="text-2xl font-bold animate-pulse">Processing Order...</h2>
        </div>
      )}

      <div className="flex flex-col-reverse md:flex-row gap-10 py-10">
        {/* LEFT: FORM SECTION */}
        <div className="flex-[2]">
          <h2 className="text-2xl font-bold mb-6 border-l-4 border-primary pl-4">
            Delivery Information
          </h2>
          <form
            className="space-y-4 bg-base-100 p-8 shadow-2xl rounded-2xl border border-base-200"
            onSubmit={handleSubmit}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label font-semibold">Name</label>
                <input
                  type="text"
                  name="name"
                  value={session?.user?.name || ""}
                  className="input input-bordered bg-base-200"
                  readOnly
                />
              </div>
              <div className="form-control">
                <label className="label font-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={session?.user?.email || ""}
                  className="input input-bordered bg-base-200"
                  readOnly
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Contact No</label><br />
              <input
                type="tel"
                name="contactNo"
                placeholder="017XXXXXXXX"
                className="input input-bordered focus:outline-primary w-full"
                required
              />
            </div>

            <div className="form-control">
              <label className="label font-semibold">Delivery Address</label><br />
              <textarea
                name="deliveryInfo"
                placeholder="আপনার পূর্ণ ঠিকানা লিখুন..."
                className="textarea textarea-bordered h-24 focus:outline-primary w-full"
                required
              ></textarea>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Special Instruction (Optional)</label><br />
              <textarea
                name="specialInstruction"
                placeholder="অর্ডার নিয়ে বিশেষ কোনো নির্দেশনা থাকলে লিখুন..."
                className="textarea textarea-bordered h-20 focus:outline-primary w-full"
              ></textarea>
            </div>

            <button
              disabled={cartItems.length === 0 || loading}
              type="submit"
              className="btn btn-primary w-full text-white font-bold text-lg mt-4"
            >
              Confirm Order (Cash on Delivery)
            </button>
          </form>
        </div>

        {/* RIGHT: ORDER SUMMARY */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="bg-base-100 p-6 shadow-xl rounded-2xl border border-base-200 sticky top-24">
            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-4">
              {cartItems.map((item) => (
                <div key={item._id} className="flex justify-between items-start border-b border-base-200 pb-3">
                  <div>
                    <p className="font-bold text-sm md:text-base line-clamp-1">{item.title}</p>
                    <p className="text-xs text-gray-500">
                      {item.quantity} × ৳{item.price}
                    </p>
                  </div>
                  <p className="font-bold text-primary shrink-0">৳{item.quantity * item.price}</p>
                </div>
              ))}
            </div>

            {cartItems.length === 0 && (
              <p className="text-center text-error font-medium py-4">আপনার কার্ট খালি!</p>
            )}

            <div className="divider"></div>

            <div className="space-y-3">
              <div className="flex justify-between text-gray-600">
                <span>Items Total</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex justify-between font-extrabold text-xl text-primary">
                <span>Grand Total</span>
                <span>৳{totalPrice}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckOut;