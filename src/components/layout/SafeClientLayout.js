"use client";

import React from "react";
import ClientLayout from "./ClientLayout";

export default function SafeClientLayout({
 children,
}) {
 return <ClientLayout>{children}</ClientLayout>;
}
