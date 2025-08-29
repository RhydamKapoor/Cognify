'use client'
import { createContext, useState } from "react"

interface createContext {
    titleName: string
    setTitleName: (titleName: string) => void
}
export const DataContext = createContext<createContext | null>(null)

export default function Data({children}: {children: React.ReactNode}) {
    const [titleName, setTitleName] = useState("")
    return (
        <DataContext.Provider value={{ titleName, setTitleName }}>
            {children}
        </DataContext.Provider>
    )
}
