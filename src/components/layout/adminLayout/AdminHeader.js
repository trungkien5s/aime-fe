import React, { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import {Link, useNavigate} from "react-router-dom";
import { toast } from "react-toastify";
import {useAuth} from "../../contexts/AuthContext";

const AdminHeader = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [menuVisible, setMenuVisible] = useState(false);
    const [mobileMenuVisible, setMobileMenuVisible] = useState(false);

    const toggleMenu = () => {
        setMenuVisible(!menuVisible);
    };

    const toggleMobileMenu = () => {
        setMobileMenuVisible(!mobileMenuVisible);
    };

    const handleLogout = () => {
        logout();
        toast.success("Logged out successfully");
        navigate("/sign-in");
        setMenuVisible(false);
        setMobileMenuVisible(false);
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (!e.target.closest(".user-menu") && !e.target.closest(".mobile-menu")) {
                setMenuVisible(false);
                setMobileMenuVisible(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Close mobile menu when screen size changes to desktop
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMobileMenuVisible(false);
            }
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <>
            <header className="fixed top-0 left-0 w-full h-16 bg-white/95 backdrop-blur-md border-b border-blue-200 flex items-center justify-between px-4 lg:px-8 shadow-sm z-50">
                {/* Logo */}
                <Link to="/admin" className="flex items-center space-x-2">
                    <img src="/logo.png" alt="SecureAI Logo" className="h-10 w-auto cursor-pointer" />
                </Link>

                {/* Desktop Navigation links */}
                <nav className="hidden md:flex items-center space-x-6 text-sm font-medium text-blue-700">
                    <Link to="/admin/test" className="hover:underline cursor-pointer transition-colors duration-200">
                        Test
                    </Link>
                </nav>

                {/* Mobile and Desktop User Menu */}
                <div className="flex items-center gap-3">
                    {/* Mobile Menu Button */}
                    <button
                        onClick={toggleMobileMenu}
                        className="md:hidden p-2 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200"
                        aria-label="Toggle mobile menu"
                    >
                        {mobileMenuVisible ? (
                            <X className="w-5 h-5" />
                        ) : (
                            <Menu className="w-5 h-5" />
                        )}
                    </button>

                    {/* User Info */}
                    <div className="relative user-menu">
                        <div className="flex items-center gap-2 cursor-pointer hover:bg-blue-50 rounded-lg p-1 transition-colors duration-200" onClick={toggleMenu}>
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full uppercase text-sm font-medium">
                                {(user?.name || user?.username || user?.email || "A").charAt(0)}
                            </div>
                            <span className="text-sm hidden sm:block truncate max-w-20 lg:max-w-none text-blue-700 font-medium">
                                {user?.name || user?.username || "ADMIN"}
                            </span>
                            <ChevronDown className={`w-4 h-4 hidden sm:block text-blue-700 transition-transform duration-200 ${menuVisible ? 'rotate-180' : ''}`} />
                        </div>
                       
                        {/* {menuVisible && (
                            <ul className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-md shadow-lg rounded-md z-50 border border-blue-200">
                                <li
                                    onClick={handleLogout}
                                    className="px-4 py-3 hover:bg-blue-50 text-blue-700 cursor-pointer rounded-md transition-colors duration-200 text-sm font-medium"
                                >
                                    Logout
                                </li>
                            </ul>
                        )} */}
                    </div>
                </div>
            </header>

            {/* Mobile Menu Overlay */}
            {mobileMenuVisible && (
                <div className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden" onClick={() => setMobileMenuVisible(false)} />
            )}

            {/* Mobile Menu */}
            <div className={`mobile-menu fixed top-16 left-0 w-full bg-white/95 backdrop-blur-md border-b border-blue-200 shadow-lg z-40 md:hidden transition-all duration-300 ease-in-out ${
                mobileMenuVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-full pointer-events-none'
            }`}>
                <nav className="px-4 py-4 space-y-2">
                    <Link 
                        to="/admin/test" 
                        className="block px-4 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                        onClick={() => setMobileMenuVisible(false)}
                    >
                        Test
                    </Link>
                    
                    {/* Mobile User Info Section */}
                    <div className="border-t border-blue-200 pt-4 mt-4">
                        <div className="flex items-center gap-3 px-4 py-2 text-blue-700">
                            <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white w-8 h-8 flex items-center justify-center rounded-full uppercase text-sm font-medium">
                                {(user?.name || user?.username || user?.email || "A").charAt(0)}
                            </div>
                            <span className="text-sm font-medium">
                                {user?.name || user?.username || "ADMIN"}
                            </span>
                        </div>
                        <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-3 text-blue-700 hover:bg-blue-50 rounded-lg transition-colors duration-200 font-medium"
                        >
                            Logout
                        </button>
                    </div>
                </nav>
            </div>
        </>
    );
};

export default AdminHeader;