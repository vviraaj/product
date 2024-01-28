"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/products");
  }, []);

  return (
    <div>
      {/* You can add content here if needed, which will be visible momentarily before redirection */}
    </div>
  );
}
