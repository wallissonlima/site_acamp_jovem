import { Navigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

export function ProtectedRoute() {
  const [authorized, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const admin = localStorage.getItem("admin");

    if (token && admin) {
      setAuthorized(true);
    } else {
      setAuthorized(false);
    }
  }, []);

  if (authorized === null) {
    return null;
  }

  if (!authorized) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
}