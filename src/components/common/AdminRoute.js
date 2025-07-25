import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

export default function AdminRoute({ children }) {
    const { user, isAuthenticated, loading } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!loading) {
            if (!isAuthenticated) {
                console.log("User not authenticated, redirecting to sign-in");
                navigate("/");
            } else if (user?.role !== "admin") {
                console.log("User is not admin, redirecting to home");
                navigate("/home");
            }
        }
    }, [isAuthenticated, loading, user, navigate]);

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-900 flex items-center justify-center">
                <div className="text-center">
                    <p className="text-white mt-4">Đang kiểm tra quyền truy cập...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated || user?.role !== "admin") {
        return null; // Will redirect in useEffect
    }

    return children;
}