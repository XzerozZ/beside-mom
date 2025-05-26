'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()
  
  useEffect(() => {
    const checkExistingToken = () => {
      try {
        const token = localStorage.getItem("token");
        if (token) {
          const role = localStorage.getItem("role");
          if (role === "Admin") {
            router.push("/admin/mominfo");
          } else if (role === "User") {
            router.push("/home");
          }
        } else {
          router.replace('/auth/login');
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.replace('/auth/login');
      }
    };
    
    checkExistingToken();
  }, [router]);

  return null
}