'use client';

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  
  useEffect(() => {
    const token = localStorage.getItem('auth_token');

    if (!token) {
      router.replace('/login');
    }
  }, [router]);

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold font-poppins">Hello, world!</h1>
    </main>
  );
}
