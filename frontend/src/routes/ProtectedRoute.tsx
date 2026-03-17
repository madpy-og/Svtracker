import React, { type ReactNode } from "react";
import { Navigate } from "react-router";
import Login from "../pages/auth/Login";

type Props = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: Props) => {
  const isAuthenticated = !!localStorage.getItem("token");

  return isAuthenticated ? <>{children}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
