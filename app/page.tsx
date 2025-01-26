"use client";

import MainLayout from "@/app/layouts/MainLayout";

export default function Home() {
  return (
    <>
      <MainLayout>
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-4xl font-bold">Welcome to Popreel</h1>
        </div>
      </MainLayout>
    </>
  );
}
