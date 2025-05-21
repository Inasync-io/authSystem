"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isAthu, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");

    if (!token) {
      router.replace("/login");
    } else {
      setIsAuth(true);
    }
  }, [router]);

  if (!isAthu) return null;

  const handleLogout = () => {
    localStorage.removeItem("auth_token");
    router.replace("/login");
  };
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold font-poppins">Hello, world!</h1>
      <button
        className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded"
        onClick={handleLogout}
      >
        Logout
      </button>
    </main>
  );
}
