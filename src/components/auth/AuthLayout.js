import React, { useState } from 'react';
import { Play, Star, Sparkles, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../../locale/LanguageSwitcher";

const AuthLayout = ({ children, title }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const { t } = useTranslation();

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat relative overflow-hidden"
            style={{ backgroundImage: "url('/secu.png')" }}
        >
            <div className="absolute inset-0 bg-black/50 z-0"></div>

            {/* Cinematic Grid Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="grid grid-cols-6 sm:grid-cols-8 md:grid-cols-12 gap-1 p-2 h-full">
                    {[...Array(96)].map((_, i) => (
                        <div
                            key={i}
                            className="bg-gradient-to-br from-slate-600 to-slate-700 rounded-sm animate-pulse"
                            style={{
                                animationDelay: `${i * 0.05}s`,
                                animationDuration: `${3 + (i % 3)}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Floating Icons */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <Play
                    className="absolute top-20 sm:top-40 right-8 sm:right-32 w-3 h-3 sm:w-4 sm:h-4 text-white/10 animate-float"
                    style={{ animationDelay: "2s" }}
                />
                <Star
                    className="absolute bottom-32 sm:bottom-40 left-8 sm:left-40 w-4 h-4 sm:w-5 sm:h-5 text-white/10 animate-float"
                    style={{ animationDelay: "4s" }}
                />
                <Sparkles
                    className="absolute bottom-16 sm:bottom-20 right-4 sm:right-20 w-3 h-3 sm:w-4 sm:h-4 text-white/10 animate-float"
                    style={{ animationDelay: "6s" }}
                />
            </div>

            {/* Header */}
            <div className="relative z-20 px-4 sm:px-6 py-4 sm:py-8">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <div className="flex items-center">
                        <img src="/logoreal.png" alt="AimeMask Logo" />
                    </div>

                    {/* Desktop Navigation and Language Switcher */}
                    <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
                        {/*<nav className="flex space-x-6 xl:space-x-8 text-slate-300">*/}
                        {/*    <Link*/}
                        {/*        to="/"*/}
                        {/*        className="hover:text-white transition-all duration-300 hover:scale-105 font-medium text-sm xl:text-base whitespace-nowrap"*/}
                        {/*    >*/}
                        {/*        {t('Home')}*/}
                        {/*    </Link>*/}
                        {/*    <a*/}
                        {/*        href="#"*/}
                        {/*        className="hover:text-white transition-all duration-300 hover:scale-105 font-medium text-sm xl:text-base whitespace-nowrap"*/}
                        {/*    >*/}
                        {/*        {t('Contact')}*/}
                        {/*    </a>*/}
                        {/*</nav>*/}
                        <div className="flex-shrink-0">
                            <LanguageSwitcher variant="auth"/>
                        </div>
                    </div>

                    {/* Mobile: Language Switcher and Menu Button */}
                    <div className="lg:hidden flex items-center space-x-3">
                        <LanguageSwitcher />s
                        {/*<button*/}
                        {/*    onClick={toggleMobileMenu}*/}
                        {/*    className="p-2 rounded-lg bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 text-white hover:bg-slate-700/50 transition-all duration-300"*/}
                        {/*    aria-label="Toggle mobile menu"*/}
                        {/*>*/}
                        {/*    /!*{isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}*!/*/}
                        {/*</button>*/}
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                {/*<div*/}
                {/*    className={`lg:hidden transition-all duration-300 ease-in-out ${*/}
                {/*        isMobileMenuOpen ? "max-h-64 opacity-100 mt-4" : "max-h-0 opacity-0 overflow-hidden"*/}
                {/*    }`}*/}
                {/*>*/}
                {/*    <nav className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl p-4 space-y-3">*/}
                {/*        /!*<Link*!/*/}
                {/*        /!*    to="/"*!/*/}
                {/*        /!*    className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-300 font-medium"*!/*/}
                {/*        /!*    onClick={() => setIsMobileMenuOpen(false)}*!/*/}
                {/*        /!*>*!/*/}
                {/*        /!*    {t('Home')}*!/*/}
                {/*        /!*</Link>*!/*/}
                {/*        /!*<a*!/*/}
                {/*        /!*    href="#"*!/*/}
                {/*        /!*    className="block px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all duration-300 font-medium"*!/*/}
                {/*        /!*    onClick={() => setIsMobileMenuOpen(false)}*!/*/}
                {/*        /!*>*!/*/}
                {/*        /!*    {t('Contact')}*!/*/}
                {/*        /!*</a>*!/*/}
                {/*    </nav>*/}
                {/*</div>*/}
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex items-center justify-center min-h-[calc(100vh-200px)] px-4 sm:px-6">
                <div className="w-full max-w-sm sm:max-w-md">
                    <div className="relative group">
                        <div className="relative backdrop-blur-2xl bg-slate-900/60 border border-slate-700/50 px-6 sm:px-8 md:px-10 py-8 sm:py-10 md:py-12 rounded-2xl sm:rounded-3xl shadow-2xl">
                            <div className="absolute inset-0 bg-gradient-to-br from-white/[0.08] via-white/[0.02] to-transparent rounded-2xl sm:rounded-3xl"></div>
                            <div className="relative">
                                <div className="text-center mb-8 sm:mb-10">
                                    <h2 className="text-white text-2xl sm:text-3xl font-bold mb-3 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                                        {title}
                                    </h2>
                                    <p className="text-slate-400 text-sm sm:text-base font-medium">
                                        {t('Welcome to AimeMask')}
                                    </p>
                                    <div className="w-12 sm:w-16 h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full mx-auto mt-3 sm:mt-4"></div>
                                </div>

                                {children}

                                <div className="mt-8 sm:mt-10 text-center">
                                    <div className="flex items-center justify-center space-x-4 text-slate-500">
                                        {/* Optional divider elements */}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <div className="relative z-10 px-4 sm:px-6 py-4 sm:py-6 border-t border-slate-800/50 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row justify-between items-center text-slate-500 text-xs sm:text-sm space-y-2 md:space-y-0">
                    <p className="font-medium text-center md:text-left">
                        {t("Copyright © 2018 - 2025 Aimesoft. All rights reserved.")}
                    </p>
                    {/*<div className="flex space-x-4 sm:space-x-6">*/}
                    {/*    <a href="#" className="hover:text-white transition-colors duration-300 font-medium">*/}
                    {/*        {t('Help')}*/}
                    {/*    </a>*/}
                    {/*    <a href="#" className="hover:text-white transition-colors duration-300 font-medium">*/}
                    {/*        {t('Contact')}*/}
                    {/*    </a>*/}
                    {/*    <a href="#" className="hover:text-white transition-colors duration-300 font-medium">*/}
                    {/*        {t('About Us')}*/}
                    {/*    </a>*/}
                    {/*</div>*/}
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
              @keyframes float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-20px) rotate(180deg); }
              }
              .animate-float {
                animation: float 6s ease-in-out infinite;
              }
            `}</style>
        </div>
    );
};

export default AuthLayout;