import { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectedAdminRouteProps {
  children: ReactNode;
}

// SECURITY WARNING: This is a mock implementation for demo purposes only.
// In production, always validate roles server-side with proper authentication.
// Client-side checks can be easily bypassed by attackers.
export const ProtectedAdminRoute = ({ children }: ProtectedAdminRouteProps) => {
  const userRole = localStorage.getItem("userRole");
  
  // Allow access only to admin and mentor roles
  if (userRole === "admin" || userRole === "mentor") {
    return <>{children}</>;
  }
  
  // Redirect unauthorized users
  return <Navigate to="/not-authorized" replace />;
};
