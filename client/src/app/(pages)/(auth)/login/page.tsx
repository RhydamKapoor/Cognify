import LoginComp from '@/components/AuthComp/LoginComp'

export default function LoginPage() {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <div className="flex flex-col rounded-xl p-5 shadow-xl bg-info/10 gap-y-10 w-1/3">
        <div className='flex flex-col items-center justify-center'>
          <h1 className='text-sm font-bold text-base-content/40 flex flex-col items-center'>Cognify
            <span className="text-3xl text-base-content/100">
              Login</span>
          </h1>
        </div>

        <LoginComp />
      </div>
    </div>
  )
}
