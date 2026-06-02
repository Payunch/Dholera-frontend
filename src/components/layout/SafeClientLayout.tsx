"use client";

import dynamic from "next/dynamic";
import React from "react";

// This wrapper handles the 'ssr: false' logic in a Client Component,
// which is required by Next.js App Router for dynamic imports with no SSR.
const ClientLayout = dynamic(() => import("./ClientLayout"), {
  ssr: false,
  // Use a minimal skeleton that matches the basic structure to keep it smooth
  loading: () => <div className="min-h-screen bg-white" />
});

export default function SafeClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientLayout>{children}</ClientLayout>;
}
