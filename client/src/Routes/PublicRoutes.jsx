import { Navigate, Outlet } from "react-router-dom";

const PublicRoutes = () => {
    const token = localStorage.getItem("access_token");

    // If user is logged in, redirect to dashboard
    if (token) {
        return <Navigate to="/dashboard" replace />;
    }

    // Otherwise, allow access to the public route
    return <Outlet />;
};

export default PublicRoutes;
