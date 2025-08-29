import Navbar from "@/components/Navbar/Navbar";
import Sidebar from "@/components/Navbar/Sidebar";


export default function layout({children}: {children: React.ReactNode}) {
    return (
        <div className='flex h-screen w-full'>
            <Sidebar />
            <div className="flex flex-col h-full w-full">
                <Navbar />
                <div className="flex flex-col items-center justify-center h-[calc(100vh-86px)] overflow-hidden w-full">
                    {children}
                </div>
            </div>
        </div>
    )
}
