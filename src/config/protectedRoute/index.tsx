import { Navigate } from "react-router-dom";
import type { ReactNode } from "react";

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const token = localStorage.getItem("access_token");
  const admin = localStorage.getItem("admin");

  if (!token || !admin || admin === "undefined") {
    return <Navigate to="/admin/login" replace />;
  }

  return <>{children}</>;
}
