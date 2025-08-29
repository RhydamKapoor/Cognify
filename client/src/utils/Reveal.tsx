'use client'
import { motion, useAnimation, useInView } from "motion/react"
import { useEffect, useRef } from "react"

export default function Reveal({children, axis, axisValue ,...props}: {children: React.ReactNode, axis: string, axisValue: number, props: any}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {once: true});

  const mainControls = useAnimation();

  useEffect(() => {
    if(isInView){
      mainControls.start('visible')
    }
  }, [isInView]);
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