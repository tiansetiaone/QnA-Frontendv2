import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ user, allowedRoles }) => {
    if (!user) {
        return <Navigate to="/" replace />;
    }

    // Jika user memiliki is_narasumber = 1, anggap dia sebagai 'narasumber'
    const isNarasumber = user.is_narasumber === 1;

    // Cek apakah user memiliki role yang diizinkan atau dia adalah narasumber yang boleh mengakses halaman admin
    const isAllowed = allowedRoles.includes(user.role) || (isNarasumber && allowedRoles.includes("narasumber"));

    return isAllowed ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
