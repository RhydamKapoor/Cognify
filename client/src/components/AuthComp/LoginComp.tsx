'use client'
import React, { useState } from 'react'
import SwipeRedirect from '../SwipingEffect/SwipeRedirect'
import { Eye, EyeClosed } from 'lucide-react';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axiosInstance from '@/app/axiosInstance';
import { AxiosError } from 'axios';

type LoginForm = {
  email: string;
  password: string;
}

export default function LoginComp() {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<LoginForm>();
  const router = useRouter();
  
  const handleGoogleLogin = () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/auth/google`;
  };

  const handleLogin : SubmitHandler<LoginForm> = async (data) => {
    const toastId = toast.loading("Logging in...");
    try {
      const response = await axiosInstance.post(`/auth/login`, data);
      toast.success("Logged in successfully", { id: toastId });
      router.push('/dashboard');  
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;
      toast.error(err.response?.data?.message || "Something went wrong", { id: toastId });
    }
  }
  return (
    <motion.div className="flex flex-col rounded-xl p-5 shadow-xl bg-info/10 gap-y-10 w-1/3" 
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className='flex flex-col items-center justify-center'>
        <h1 className='text-sm font-bold text-base-content/40 flex flex-col items-center'>Cognify
          <span className="text-3xl text-base-content/100">
            Login</span>
        </h1>
      </div>
      <div className="flex gap-x-5 *:w-1/2 *:bg-black/20 *:px-3 *:py-2 *:rounded-lg w-full *:cursor-pointer">
        <button type='button' onClick={handleGoogleLogin}>Google</button>
        <button>Facebook</button>
      </div>

      <div className="flex flex-col justify-center relative w-full">
        <div className="w-full h-0.5 bg-base-content -z-10 relative"></div>
        <div className="absolute left-1/2 -translate-x-1/2 bg-base-300 z-50 rounded">
          <div className="flex w-full justify-center bg-info/10 px-2">
            <h1 className='text-sm font-bold text-base-content'>Credentials</h1>
          </div>
        </div>
      </div>

      <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(handleLogin)}>

        <div className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" className='outline-none border-b border-base-content p-2 w-full' {...register("email", {required: true})} />
        </div>
        <div className="flex flex-col">
          <label htmlFor="password">Password</label>
          <div className="relative">
            <input type={showPassword ? `text` : `password`} id="password" className='outline-none border-b border-base-content p-2 pr-10 w-full' {...register("password", {required: true})} />

            <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
              {
                !showPassword ? <EyeClosed size={21} /> : <Eye size={21} />
              }
            </span>

          </div>
        </div>

        <div className="flex flex-col w-full gap-y-5">
          <button type='submit' className='bg-base-content text-base-100 px-4 py-2 rounded-lg w-full cursor-pointer'>Login</button>
          <div className="flex flex-col w-full items-center">
            <SwipeRedirect location='register' heading={`New Cognifier? Swipe left to signup`} />
          </div>
        </div>
      </form>
    </motion.div>
  )
}
