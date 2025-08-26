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

    // useEffect(() => {
    //     // Load saved theme or system preference
    //     const savedTheme = localStorage.getItem('theme') as ThemeTypes | null;
    //     if (savedTheme) {
    //       setTheme(savedTheme);
    //     } else {
    //       const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    //       setTheme(prefersDark ? 'dark' : 'light');
    //     }
    //   }, []);

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
