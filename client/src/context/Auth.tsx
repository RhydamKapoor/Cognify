'use client'
import axiosInstance from "@/app/axiosInstance";
import { AxiosError } from "axios";
import { createContext, useEffect, useState } from "react";

interface AuthDetails {
        id: string;
        name: string;
        email: string;
        role: string;
        provider: string;
}
export const AuthContext = createContext<{user: AuthDetails | null} | null>(null);


export default function Auth({children}: {children: React.ReactNode}) {
    const [user, setUser] = useState<AuthDetails | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axiosInstance.get("/profile/me");
                setUser(response?.data?.data);
            } catch (error: unknown) {
              const err = error as AxiosError<{ message: string }>;
              console.log();
            }
        }
        fetchUser();
    }, []);
  return (
    <AuthContext.Provider value={{user}}>
      {children}
    </AuthContext.Provider>
  )
}
