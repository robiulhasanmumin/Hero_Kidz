"use client";
import Link from "next/link";
import React from "react";
import { HiUser, HiMail, HiLockClosed } from "react-icons/hi";
import { FcGoogle } from "react-icons/fc";
import { postUser } from "@/actions/server/auth";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";

const RegisterPage = () => {
  const router = useRouter();
  const params = useSearchParams()
  const callback = params.get("callbackUrl") || "/"
  

const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    const payload = { name, email, password };

    // ১. লোডিং শুরু
    Swal.fire({
      title: 'Creating Account...',
      didOpen: () => { Swal.showLoading(); }
    });

    try {
      // ২. ইউজার রেজিস্ট্রেশন অ্যাকশন কল
      const result = await postUser(payload);

      if (result) {
        // ৩. রেজিস্ট্রেশন সফল হলে সরাসরি লগইন করার চেষ্টা
        const loginRes = await signIn("credentials", {
          email: email,
          password: password,
          redirect: false, // এটি অত্যন্ত জরুরি
        });

        if (loginRes?.ok) {
          Swal.fire({
            icon: 'success',
            title: 'Account Created!',
            text: 'Redirecting to home...',
            timer: 2000,
            showConfirmButton: false
          });
          router.push(callback);
          router.refresh();
        } else {
          // রেজিস্ট্রেশন হয়েছে কিন্তু অটো-লগইন ফেইল করলে
          Swal.fire({
            icon: 'warning',
            title: 'Account Created',
            text: 'Please login manually.',
          });
          router.push("/login");
        }
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'User already exists or something went wrong!',
        });
      }
    } catch (error) {
      console.error("Registration Error:", error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'An error occurred. Please try again.',
      });
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 py-10">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Create Account</h2>
            <p className="text-sm text-gray-500 mt-2">Join Hero Kidz today!</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-4">
            {/* Full Name */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiUser className="text-xl" />
                </span>
                <input
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  className="input input-bordered w-full pl-10 focus:outline-primary"
                  required
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email Address</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiMail className="text-xl" />
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="john@example.com"
                  className="input input-bordered w-full pl-10 focus:outline-primary"
                  required
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiLockClosed className="text-xl" />
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="Min. 6 characters"
                  className="input input-bordered w-full pl-10 focus:outline-primary"
                  required
                />
              </div>
            </div>

            {/* Register Button */}
            <button type="submit" className="btn btn-primary w-full mt-4">Register</button>
          </form>

          <div className="divider text-xs text-gray-400 uppercase">Or signup with</div>

          <button className="btn btn-outline w-full gap-3">
            <FcGoogle className="text-2xl" /> Signup with Google
          </button>

          <p className="text-center mt-6 text-sm">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary font-bold">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;