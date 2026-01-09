"use server";

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import { clearCart, getCart } from "./cart";
import { sendEmail } from "@/lib/sendEmail";
import { orderInvoiceTemplate } from "@/lib/orderInvoice";
import { ObjectId } from "mongodb";
import { adminOrderNotificationTemplate } from "@/lib/AdminInvoice";
import { revalidatePath } from "next/cache";

const { dbConnect, collections } = require("@/lib/dbConnect");

export const createOrder = async (payload) => {
  try {
    // ১. ইউজার সেশন চেক
    const session = await getServerSession(authOptions);
    const user = session?.user;
    if (!user) return { success: false, message: "অর্ডার করতে লগইন করুন" };

    // ২. কার্ট ডাটা নিয়ে আসা
    const cart = await getCart();
    if (!cart || cart.length === 0) {
      return { success: false, message: "আপনার কার্টে কোনো প্রোডাক্ট নেই" };
    }

    // ৩. মোট প্রাইস ক্যালকুলেশন
    const totalPrice = cart.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // ৪. অর্ডারের ডাটা অবজেক্ট তৈরি
    const newOrder = {
      createdAt: new Date().toISOString(),
      items: cart,
      customerName: user.name,
      customerEmail: user.email,
      contact: payload.contact,
      address: payload.address,
      instruction: payload.instruction || "No specific instruction",
      totalPrice,
      status: "pending", // ডিফল্ট স্ট্যাটাস
    };

    // ৫. ডাটাবেসে সেভ করা
    const orderCollection = await dbConnect(collections.ORDER);
    const orderResult = await orderCollection.insertOne(newOrder);

    // ৬. ডাটাবেসে সেভ সফল হলে ইমেইল পাঠানো এবং কার্ট ক্লিয়ার করা
    if (orderResult.insertedId) {
      const orderIdString = orderResult.insertedId.toString();

      // কার্ট ক্লিয়ার করা
      await clearCart();
      revalidatePath("/cart"); // কার্ট পেজ রিফ্রেশ করার জন্য

      // ইউজারকে ইনভয়েস ইমেইল পাঠানো
      try {
        await sendEmail({
          to: user.email,
          subject: "🎉 Your Order Invoice - Hero Kidz",
          html: orderInvoiceTemplate({
            orderId: orderIdString,
            items: cart,
            totalPrice,
          }),
        });

        // এডমিনকে নোটিফিকেশন পাঠানো
        await sendEmail({
          to: "ferdouszihad.ph@gmail.com",
          subject: "Congrates🔥. New Sell from Hero Kidz",
          html: adminOrderNotificationTemplate({
            orderId: orderIdString,
            items: cart,
            totalPrice,
            address: payload.address,
            contact: payload.contact,
            name: user.name,
            email: user.email,
            instruction: payload?.instruction || "N/A",
          }),
        });
      } catch (emailError) {
        console.error("Email Sending Error:", emailError);
        // ইমেইল না গেলেও যেন অর্ডার সাকসেস দেখায়, তাই এখানে রিটার্ন করছি না
      }

      return { 
        success: true, 
        message: "অর্ডারটি সফলভাবে গ্রহণ করা হয়েছে" 
      };
    }

    return { success: false, message: "অর্ডার সেভ করতে সমস্যা হয়েছে" };

  } catch (error) {
    console.error("Critical Order Error:", error);
    return { success: false, message: "সার্ভারে টেকনিক্যাল সমস্যা হয়েছে" };
  }
};