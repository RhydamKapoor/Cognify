'use client'
import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react'
import SwipeRedirect from '../SwipingEffect/SwipeRedirect';
import axios from 'axios';
import { motion } from 'motion/react';
import toast from 'react-hot-toast';
import { useForm, SubmitHandler } from 'react-hook-form';


type RegisterForm = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export default function RegisterComp() {
  const [showPassword, setShowPassword] = useState(false);
  const {register, handleSubmit, formState: {errors}} = useForm<RegisterForm>({
    defaultValues: {
      firstName: 'Rhydam',
      lastName: "Kapoor",
      email: "rhydamkapoor@gmail.com",
      password: "password"
    }
  });

  const handleRegister : SubmitHandler<RegisterForm> = async (data) => {
    const toastId = toast.loading("Registering...");
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, data);
      toast.success("Registered successfully", { id: toastId });
    } catch (error : any) {
      toast.error(error.response.data.message, { id: toastId });
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
            Signup</span>
        </h1>
      </div>

      <div className="flex flex-col justify-center relative w-full">
        <div className="w-full h-0.5 bg-base-content -z-10 relative"></div>
        <div className="absolute left-1/2 -translate-x-1/2 bg-base-300 z-50 rounded">
          <div className="flex w-full justify-center bg-info/10 px-2">
            <h1 className='text-sm font-bold text-base-content'>Credentials</h1>
          </div>
        </div>
      </div>

      <form className="flex flex-col gap-y-6" onSubmit={handleSubmit(handleRegister)}>
        <div className="flex justify-between">
          <div className="flex flex-col">
            <label htmlFor="firstName">First Name</label>
            <input type="text" id="firstName" className='outline-none border-b border-base-content p-2 w-full' {...register("firstName", {required: true})} />
          </div>
          <div className="flex flex-col">
            <label htmlFor="lastName">Last Name</label>
            <input type="text" id="lastName" className='outline-none border-b border-base-content p-2 w-full' {...register("lastName", {required: true})} />
          </div>
        </div>

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
          <button type='submit' className='bg-base-content text-base-100 px-4 py-2 rounded-lg cursor-pointer w-full'>Signup</button>
          <div className="flex flex-col w-full items-center">
            <SwipeRedirect location='login' heading={`Already a Cognifier? Swipe left to login`} />
          </div>
        </div>
      </form>
    </motion.div>
  )
}
