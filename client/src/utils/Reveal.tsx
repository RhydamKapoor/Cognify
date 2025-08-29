'use client'
import { HTMLMotionProps, motion, useAnimation, useInView } from "motion/react"
import { useEffect, useRef } from "react"


type RevealProps = {
  children: React.ReactNode
  axis: "x" | "y"
  axisValue: number
} & HTMLMotionProps<"div">

export default function Reveal({children, axis, axisValue ,...props}: RevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  const mainControls = useAnimation();

  useEffect(() => {
    if(isInView){
      mainControls.start('visible')
    }
  }, [isInView, mainControls]);
  return (
    <div ref={ref} className='relative w-fit'>
      <motion.div 
      variants={{
        hidden: {opacity: 0, [axis]: axisValue},
        visible: {opacity: 1, [axis]: 0}
      }}
      initial="hidden"
      animate={mainControls}
      transition={{duration: 0.4, delay: 0.4}}
      {...props}
      >
        {children}
      </motion.div>
    </div>
  )
}