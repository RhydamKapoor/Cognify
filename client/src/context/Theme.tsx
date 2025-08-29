'use client'
import { createContext, useEffect, useState } from "react";


type ThemeTypes = "light" | "dark";
interface ThemeContextType {
    theme: ThemeTypes;
    setTheme: (theme: ThemeTypes) => void;
}
export const ThemeContext = createContext<ThemeContextType | null>(null)


export default function Theme({children}: {children: React.ReactNode}) {
    const [theme, setTheme] = useState<ThemeTypes>("dark")

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
      }, [theme]);
    
  return (
    <ThemeContext.Provider value={{theme, setTheme}}>
        {children}
    </ThemeContext.Provider>
  )
}
