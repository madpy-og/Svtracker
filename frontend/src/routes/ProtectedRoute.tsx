import React, { useEffect, useState, type ReactNode } from "react";
import { Navigate } from "react-router";
import { checkAuth } from "../api/authApi";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      const result = await checkAuth();

      setIsAuthenticated(result);
      setLoading(false);
    };

    check();
  }, []);

  if (loading) return null;

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
