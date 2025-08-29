import LoginComp from '@/components/AuthComp/LoginComp'
import Navbar from '@/components/Navbar/Navbar'

export default function LoginPage() {
  return (
    <div className='flex flex-col h-screen'>
      <Navbar />
      <div className="flex flex-col items-center justify-center h-[calc(100vh-86px)] overflow-hidden">
        <LoginComp />
      </div>
    </div>
  )
}
