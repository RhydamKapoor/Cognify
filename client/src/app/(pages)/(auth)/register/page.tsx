import RegisterComp from '@/components/AuthComp/RegisterComp'
import Navbar from '@/components/Navbar/Navbar'

export default function page() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-86px)] overflow-hidden">
        <RegisterComp />
      </div>
    </div>
  )
}
