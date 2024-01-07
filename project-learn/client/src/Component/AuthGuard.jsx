import { Navigate, useLocation } from "react-router-dom";
import React from "react";
import { useSelector } from "react-redux";

const AuthGuard = ({ children }) => {
  const auth = useSelector((state) => state);
  const location = useLocation().pathname;
  
  return (auth.isLoggedIn && localStorage.getItem('token') != null) ? (
    children
  ) : (
    <Navigate to={`/`} state={{ from: location }} replace />
  );
};
export default AuthGuard;