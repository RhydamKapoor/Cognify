'use client'
import { Eye, EyeClosed } from 'lucide-react';
import React, { useState } from 'react'
import SwipeRedirect from '../SwipingEffect/SwipeRedirect';

export default function RegisterComp() {
    const [showPassword, setShowPassword] = useState(false);
    return (
      <>
  
          <div className="flex flex-col justify-center relative w-full">
            <div className="w-full h-0.5 bg-base-content -z-10 relative"></div>
            <div className="absolute left-1/2 -translate-x-1/2 bg-base-300 z-50 rounded">
              <div className="flex w-full justify-center bg-info/10 px-2">
                <h1 className='text-sm font-bold text-base-content'>Credentials</h1>
              </div>
            </div>
          </div>
  
          <form className="flex flex-col gap-y-6">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <label htmlFor="firstName">First Name</label>
                <input type="text" id="firstName" className='outline-none border-b border-base-content p-2 w-full' />
              </div>
              <div className="flex flex-col">
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id="lastName" className='outline-none border-b border-base-content p-2 w-full' />
              </div>
            </div>
  
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" className='outline-none border-b border-base-content p-2 w-full' />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password">Password</label>
              <div className="relative">
              <input type={showPassword ? `text` : `password`} id="password" className='outline-none border-b border-base-content p-2 pr-10 w-full' />
  
              <span className="absolute right-2 top-1/2 -translate-y-1/2 cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                  {
                      !showPassword ? <EyeClosed size={21}/> : <Eye size={21}/>
                  }
              </span>
  
              </div>
            </div>
  
            <div className="flex flex-col w-full gap-y-5">
              <button className='bg-base-content text-base-100 px-4 py-2 rounded-lg w-full'>Login</button>
              <div className="flex flex-col w-full items-center">
                <SwipeRedirect location='login' heading={`Already a Cognifier? Swipe left to login`}/>
              </div>
            </div>
          </form>
      </>
    )
}
