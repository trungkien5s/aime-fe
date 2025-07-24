import React, { useState } from 'react';
import { Menu, Shield, X, User, LogOut, Settings, ChevronDown } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import {useTranslation} from "react-i18next";
import LanguageSwitcher from "../../../locale/LanguageSwitcher";
import { toast } from 'react-toastify';
import i18n from "i18next";
const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const { user, logout, loading, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const apiURL = process.env.REACT_APP_API_URL;
    const location = useLocation();
    const {t} = useTranslation();

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem("access_token");
            if (!token) {
                logout();
                navigate("/", { replace: true });
                return;
            }

            const response = await axios.post(
                `${apiURL}/auth/logout`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 201) {
                localStorage.removeItem("access_token");
                logout();
                toast.success(t("You have been logged out successfully!"));
                navigate("/", { replace: true });
            } else {
                toast.error(t("An error occurred during logout. Please try again."));
            }
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(t("An unexpected error occurred."));
        }
    };





    const toggleUserMenu = () => {
        setIsUserMenuOpen(!isUserMenuOpen);
    };

    const isActive = (path) => location.pathname === path;
    const closeAllDropdowns = () => {
        setIsUserMenuOpen(false);
        setIsMenuOpen(false);
    };

    if (loading) {
        return (
            <header className="relative z-50 bg-white/95  backdrop-blur-md border-b border-blue-500 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            <div className="h-10 w-10 bg-gray-200 rounded animate-pulse"></div>
                        </div>
                        <div className="w-20 h-8 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </header>
        );
    }

    return (
        <>
            {isMenuOpen && (
                <div className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm" onClick={closeAllDropdowns} />
            )}

            <header className="relative z-50 bg-white/95 backdrop-blur-md border-b border-blue-200 shadow-sm">
                <div className="container mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <Link to="/" className="flex items-center space-x-2">
                            <img src="/logo.png" alt="SecureAI Logo" className="h-10 w-auto cursor-pointer" />
                        </Link>

                        {/* Navigation */}
                        <nav className="hidden md:flex items-center space-x-6"></nav>

                        {/* User Menu or Sign In */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isAuthenticated && user ? (
                                <div className="relative group">
                                    <button className="flex items-center space-x-2 text-blue-700 hover:text-blue-600 transition-all duration-300 group">
                                        <div className="relative">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
        <span className="text-white font-semibold text-sm">
            {(user.name || user.email).charAt(0).toUpperCase()}
        </span>
                                            </div>
                                            <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></div>
                                        </div>
                                        <div className="text-left">
                                            <p className="font-medium text-sm">{user.name || user.email}</p>
                                            <p className="text-gray-500 text-xs">{t("Premium Member")}</p>
                                        </div>
                                        <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
                                    </button>

                                    {/* Hover Dropdown Menu */}
                                    <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-md rounded-lg shadow-lg border border-blue-200 py-2 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                                        <div className="px-4 py-3 ">
                                            <div className="flex items-center space-x-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-sm">
            {(user.name || user.email).charAt(0).toUpperCase()}
        </span>
                                                </div>
                                                <div>
                                                    <p className="text-blue-900 font-semibold text-sm">
                                                        {user.name || user.email}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">{user.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            ) : (
                                <Link
                                    to="/"
                                    className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-700 transition-all duration-300 border border-gray-500"
                                >
                                    {t("Sign In")}
                                </Link>
                            )}
                            <div className="flex-shrink-0 ">
                                <LanguageSwitcher variant="homepage"/>
                            </div>
                        </div>

                        {/* Mobile Button */}
                        <button className="md:hidden text-blue-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>

                    {/* Mobile Menu */}
                    {isMenuOpen && (
                        <div className="md:hidden mt-4 py-4 bg-white/95 backdrop-blur-md rounded-lg border border-blue-200">
                            <nav className="flex flex-col space-y-4 px-4">
                                <div className="flex flex-col space-y-2 pt-4 border-t border-blue-200">
                                    {isAuthenticated && user ? (
                                        <>
                                            <div className="flex items-center space-x-3 px-2 py-2">
                                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
        <span className="text-white font-semibold text-xs">
            {(user.name || user.email).charAt(0).toUpperCase()}
        </span>
                                                </div>
                                                <div>
                                                    <p className="text-blue-900 font-medium text-sm">
                                                        {user.name || user.email}
                                                    </p>
                                                    <p className="text-gray-500 text-xs">{user.email}</p>
                                                </div>
                                            </div>
                                            {/*<button*/}
                                            {/*    onClick={() => {*/}
                                            {/*        navigate("/profile");*/}
                                            {/*        setIsMenuOpen(false);*/}
                                            {/*    }}*/}
                                            {/*    className="flex items-center px-2 py-2 text-blue-700 hover:bg-blue-50 rounded transition-all duration-300"*/}
                                            {/*>*/}
                                            {/*    <User className="w-4 h-4 mr-3" />*/}
                                            {/*    <span>{t("Profile")}</span>*/}
                                            {/*</button>*/}
                                            {/*<button className="flex items-center px-2 py-2 text-blue-700 hover:bg-blue-50 rounded transition-all duration-300">*/}
                                            {/*    <Settings className="w-4 h-4 mr-3" />*/}
                                            {/*    <span>{t("Settings")}</span>*/}
                                            {/*</button>*/}
                                            {/*<button*/}
                                            {/*    onClick={handleLogout}*/}
                                            {/*    className="flex items-center px-2 py-2 text-red-600 hover:bg-red-50 rounded transition-all duration-300"*/}
                                            {/*>*/}
                                            {/*    <LogOut className="w-4 h-4 mr-3" />*/}
                                            {/*    <span>{t("Log out")}</span>*/}
                                            {/*</button>*/}
                                        </>
                                    ) : (
                                        <Link
                                            to="/"
                                            className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-600 text-white rounded-lg hover:from-blue-700 hover:to-blue-700 transition-all duration-300 text-center"
                                            onClick={() => setIsMenuOpen(false)}
                                        >
                                            {t("Sign In")}
                                        </Link>
                                    )}
                                </div>
                            </nav>
                        </div>
                    )}
                </div>
            </header>
        </>
    );
};

export default Header;
