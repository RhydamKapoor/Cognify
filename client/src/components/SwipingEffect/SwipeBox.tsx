'use client'
import React from 'react'
import { useSwipeable } from 'react-swipeable';
import { motion } from 'motion/react';

export default function SwipeBox({setSwiped, heading}: {setSwiped: (swiped: boolean) => void, heading: string}) {

    const handlers = useSwipeable({
        onSwipedLeft: (eventData) => {
            console.log(eventData.absX);
            if (eventData.absX > 50) {
                setSwiped(true);
            }
        },
        preventScrollOnSwipe: true,
        trackTouch: true,
        trackMouse: true,
    })
    return (
        <div>
            <div {...handlers} className="flex flex-col gap-y-5 items-center justify-center w-70 select-none relative">
                <div className="flex justify-end w-full">
                    <motion.div
                        className="flex relative"
                        initial={{ width: 0, opacity: 1 }}
                        animate={{ width: "100%", opacity: 0 }}
                        transition={{
                            duration: 2,            // total time (1s expand + 1s fade)
                            times: [0, 0.5, 1],     // first half for width, second half for opacity
                            repeat: Infinity,
                            repeatDelay: 2,         // wait 4s after fade-out before restarting
                        }}
                    >
                        <span className='w-5 h-5 rounded-full bg-base-content z-20'></span>

                        <span className='absolute top-0 left-0 w-full h-full bg-base-content/30 rounded-full z-10'></span>
                    </motion.div>
                </div>

                <span className='text-sm'>{heading}</span>
            </div>
        </div>
    )
}
