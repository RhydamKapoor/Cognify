'use client'
import { DataContext } from '@/context/Data'
import { ThemeContext } from '@/context/Theme'
import { Moon, Sun } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext, useEffect, useState } from 'react'

export default function Navbar() {
    const path = usePathname()
    const data = useContext(DataContext)
    const [showNavbar, setShowNavbar] = useState(false)
    const themeOptions = useContext(ThemeContext)
    console.log(path);
    
    
    useEffect(() => {
        if(path === "/") {
            setShowNavbar(false)
        }
        if(path === "/login" || path === "/register") {
            setShowNavbar(true)
            data?.setTitleName("Cognify")
        }
        else {
            setShowNavbar(true)
        }
    }, [path]);

    return (
        <AnimatePresence>
            {
                showNavbar && (
                    <motion.nav className={`flex items-center p-5`}
                    initial={{y: -100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -100, opacity: 0 }}
                    transition={{
                        duration: 0.8,
                        ease: "easeInOut"
                    }}
                    >
                        <div className='flex justify-between items-center gap-4 w-full'>
                            <div className='flex items-center gap-4'>
                                <Link href='/'>
                                    <h1 className='text-3xl font-bold'>{data?.titleName}</h1>
                                </Link>
                            </div>
            
                            <ul>
                                <div className='rounded-full flex items-center p-2 gap-x-3 shadow-xl py-3 bg-base-100'>
                                    <div className={`flex items-center *:w-1/2 relative after:content-[''] after:absolute after:w-1/2 ${themeOptions?.theme === "dark" ? `after:right-0` : `after:left-0`} after:h-[150%] after:rounded-full after:bg-white/50 py-0.5`}>
                                        <button type="button" className="flex justify-center px-2 z-20 cursor-pointer" onClick={() => themeOptions?.setTheme("light")}>
                                            <Sun size={18}/>
                                        </button>
                                        <button type="button" className="flex justify-center px-2 z-20 cursor-pointer" onClick={() => themeOptions?.setTheme("dark")}>
                                            <Moon size={18} />
                                        </button>
                                    </div>
                                </div>
                            </ul>
                        </div>
                    </motion.nav>

                )
            }
        </AnimatePresence>
    )
}
