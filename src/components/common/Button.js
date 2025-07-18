import React from 'react';

const Button = ({ children, onClick, disabled, variant = 'primary' }) => {
    const baseClasses = "w-full py-3 px-4 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variantClasses = {
        primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
        secondary: "bg-gray-100 hover:bg-gray-200 text-gray-700 focus:ring-gray-500 flex items-center justify-center"
    };

    return (
        <button
            className={`${baseClasses} ${variantClasses[variant]}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};
export default Button;
