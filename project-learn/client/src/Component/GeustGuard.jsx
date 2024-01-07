import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const GeustGuard = ({ children }) => {
    const auth = useSelector((state) => state);
    const location = useLocation().pathname;
    
    return (auth.isLoggedIn && localStorage.getItem('token') != null) ?
        <Navigate to={`/home`} state={{ from: location }} replace /> :
        (children);
}

export default GeustGuard