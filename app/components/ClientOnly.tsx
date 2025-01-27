// This page is a wrapper component for handling hydration issues with Next.js
// It will render its children when the component is mounted on the frontend

"use client";
import React, { useState, useEffect } from "react";

export default function ClientOnly({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => {
    setIsClient(true);
  }, []);

  return <> {isClient ? <div>{children}</div> : null} </>;
}
