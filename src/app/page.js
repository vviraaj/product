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
      <h1>hiii</h1>
    </div>
  );
}
