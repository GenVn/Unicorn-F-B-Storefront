"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    const timeout = setTimeout(() => {
      router.push("/greeting");
    }, 4000);
    return () => clearTimeout(timeout);
  }, []);
  return (
    <main className="w-full flex justify-center min-h-screen">
      <div className="w-full max-w-md bg-gray-50 min-h-screen flex items-center justify-center">
        <Image
          className="bounce-top"
          src={"/Logo.png"}
          width={250}
          height={250}
          alt="Unicorn F&B Icon"
        />
      </div>
    </main>
  );
}
