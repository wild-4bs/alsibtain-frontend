import "./dashboard.css";
import React from "react";
import { Sidebar } from "./components/Sidebar";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { Toaster } from "sonner";

interface Props {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: Props) {
  return (
    <ProtectedRoute>
      <Toaster />
      <div
        dir="ltr"
        className="min-h-screen bg-black text-white **:[direction:ltr]"
      >
        <Sidebar />
        <div className="ms-(--sidebar-width)">{children}</div>
      </div>
    </ProtectedRoute>
  );
}
