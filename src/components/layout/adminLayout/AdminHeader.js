import React, { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import {useAuth} from "../../contexts/AuthContext";

const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/sign-in");
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".user-menu")) {
                setMenuVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-white/95 backdrop-blur-md border-b border-blue-200 flex items-center justify-between px-4 lg:px-8 shadow-sm z-50">
            {/* Logo */}
            <Link to="/admin" className="flex items-center space-x-2">
                <img src="/logo.png" alt="SecureAI Logo" className="h-10 w-auto cursor-pointer" />
            </Link>

            {/* User Info */}
            <div className="relative user-menu">
                <div className="flex items-center gap-2 cursor-pointer" onClick={toggleMenu}>
                    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full uppercase">
                        {(user?.name || user?.username || user?.email || "A").charAt(0)}
                    </div>
                    <span className="text-sm hidden sm:block truncate max-w-20 lg:max-w-none text-blue-700">
            {user?.name || user?.username || "ADMIN"}
          </span>
                    <ChevronDown className="w-4 h-4 hidden sm:block text-blue-700" />
                </div>

                {menuVisible && (
                    <ul className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md shadow-lg rounded-md z-50 border border-blue-200">
                        <li
                            onClick={handleLogout}
                            className="px-4 py-2 hover:bg-blue-50 text-blue-700 cursor-pointer rounded-t-md"
                        >
                            Logout
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default AdminHeader;
