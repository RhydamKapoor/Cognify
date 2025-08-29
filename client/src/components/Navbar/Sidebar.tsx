'use client'
import { motion } from 'motion/react'
import Link from 'next/link'
import { IoChatbubble } from 'react-icons/io5'
import { MdDashboard } from 'react-icons/md'
import { PiFoldersFill } from 'react-icons/pi'


export default function Sidebar() {
  const MenuList = [
    {
      label: "Dashboard",
      icon: <MdDashboard />,
      href: "/dashboard"
    },
    {
      label: "Chat",
      icon: <IoChatbubble />,
      href: "/dashboard/chat"
    },
    {
      label: "Folder",
      icon: <PiFoldersFill />,
      href: "/dashboard/folder"
    },
  ]
  return (
    <motion.div className='h-full bg-base-100/20 border-r border-base-content'
      initial={{ width: 70 }}
      whileHover={{ width: 250 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex flex-col justify-content h-full px-4">
        <Link href="/" className="flex items-center w-full overflow-hidden h-[86px] gap-x-1">
          <img src="/cognify.png" alt="logo" className='w-9 h-9' />
          <h1 className='text-xl font-bold'>Cognify</h1>
        </Link>

        <div className="flex flex-col w-full overflow-hidden">
          <ul className='pt-10 flex flex-col gap-y-6'>
            {MenuList.map((item, index) => (
              <Link href={item.href} key={index} className="flex items-center justify-center w-full font-[family-name:var(--font-gabarito)]">
                <div className='flex items-center gap-2 w-full px-1.5 text-xl'>
                  <span className='text-2xl'>{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                </div>
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}
