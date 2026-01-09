"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { FcGoogle } from "react-icons/fc";
import { HiMail, HiLockClosed } from "react-icons/hi";
import Swal from "sweetalert2"; // SweetAlert ইমপোর্ট করুন

const LoginPage = () => {
  const router = useRouter();
  const params = useSearchParams()
  const callback = params.get("callbackUrl") || "/"

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // লোডিং এলার্ট শুরু
    Swal.fire({
      title: 'Logging in...',
      text: 'Please wait a moment',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, 
        callbackUrl: params.get("callbackUrl") || "/",
      });

      if (res?.error) {
         Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: 'Invalid Email or Password!',
          confirmButtonColor: '#EF4444', // Tailwind red-500
        });
      } else {
        // সফল এলার্ট
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'You have logged in successfully.',
          timer: 2000,
          showConfirmButton: false,
        });

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong!',
      });
    }
  };

  const handleGoogleLogin = () => {
    signIn("google", { callbackUrl: params.get("callbackUrl") || "/" , redirect:"false"});
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4 ">
      <div className="card w-full max-w-md bg-base-100 shadow-2xl">
        <div className="card-body">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-bold">Login Please</h2>
            <p className="text-sm text-gray-500 mt-2">Enter your credentials to access Hero Kidz</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="form-control">
              <label className="label font-semibold">Email Address</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiMail className="text-xl" />
                </span>
                <input
                  name="email"
                  type="email"
                  placeholder="name@example.com"
                  className="input input-bordered w-full pl-10 focus:outline-primary"
                  required
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label font-semibold">Password</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                  <HiLockClosed className="text-xl" />
                </span>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full pl-10 focus:outline-primary"
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-2">Login</button>
          </form>

          <div className="divider text-xs text-gray-400 uppercase">Or continue with</div>

          <button 
            onClick={handleGoogleLogin}
            type="button" 
            className="btn btn-outline w-full gap-3 hover:bg-base-200"
          >
            <FcGoogle className="text-2xl" /> Login with Google
          </button>

          <p className="text-center mt-6 text-sm">
            Don't have an account?{" "}
            <Link href={`/register?callbackUrl=${callback.slice(1)}`} className="link link-primary font-bold">Register here</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;