'use client'
import { motion } from 'motion/react'
import SwipeRedirect from './SwipingEffect/SwipeRedirect'
import { useContext, useEffect } from 'react';
import { AuthContext } from '@/context/Auth';

export default function HomeIntro() {
  const data = useContext(AuthContext);
  console.log(data?.user);
  return (
    <>
      <motion.div className="flex flex-col items-center"
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 20, opacity: 0 }}
      transition={{
        delay: 0.8,
        duration: 0.5,
        ease: "easeInOut"
      }}
      >
        <h1 className="flex flex-col items-center text-lg text-base-content/70 select-none">Welcome to <br /><span className="text-6xl font-bold text-base-content/100">Cognify</span></h1>
      </motion.div>

      <div className="absolute bottom-10 flex justify-center w-full">
        <SwipeRedirect location="login" heading="Swipe Left to continue" />
      </div>
    </>
  )
}
