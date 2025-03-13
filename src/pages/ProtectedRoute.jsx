import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ allowedRoles }) => {
    const { user } = useAuth();
    const storedUser = JSON.parse(localStorage.getItem("user"));

    if (!user && !storedUser) {
        return <Navigate to="/" replace />;
    }

    const activeUser = user || storedUser; // Gunakan user dari state atau localStorage

    // Jika user memiliki is_narasumber = 1, anggap dia sebagai 'narasumber'
    const isNarasumber = activeUser?.is_narasumber === 1;

    // Cek apakah user memiliki role yang diizinkan atau dia adalah narasumber
    const isAllowed = allowedRoles.includes(activeUser?.role) || 
                     (isNarasumber && allowedRoles.includes("narasumber"));

    return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
