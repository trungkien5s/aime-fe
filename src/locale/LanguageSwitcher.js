import React from 'react';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';

const LanguageSwitcher = ({ variant = "default" }) => {
    const { i18n } = useTranslation();

    const languages = [
        {
            code: 'en',
            name: 'English',
            flag: 'https://flagcdn.com/gb.svg',
        },
        {
            code: 'ja',
            name: '日本語',
            flag: 'https://flagcdn.com/jp.svg',
        },
    ];

    const changeLanguage = (langCode) => {
        i18n.changeLanguage(langCode);
        localStorage.setItem('preferred-language', langCode);
    };


    const getCurrentLanguage = () => {
        return languages.find(lang => lang.code === i18n.language) || languages[0];
    };

    // 🎨 Class tùy biến theo variant
// 🎨 Class tùy biến theo variant
    const baseButtonClass = {
        default: "bg-slate-800/70 text-white border border-slate-600/50 hover:bg-slate-700/70",
        auth: "bg-slate-900/70 text-white border border-slate-600/40 hover:bg-slate-800/80 backdrop-blur-sm",
        homepage: "bg-blue-100 text-blue-800 border border-blue-200 hover:bg-blue-200",
    }[variant];

    const dropdownBg = {
        default: "bg-slate-800/90 border-slate-600/50 text-white",
        auth: "bg-slate-900/90 text-white border border-slate-600/40 backdrop-blur-md",
        homepage: "bg-white border-blue-200 text-blue-900",
    }[variant];


    return (
        <div className="relative group">
            <button className={`flex items-center space-x-2 px-3 py-3 rounded-lg transition-all duration-300 group-hover:border-opacity-80 ${baseButtonClass}`}>
                <img
                    src={getCurrentLanguage().flag}
                    alt={getCurrentLanguage().code}
                    className="w-5 h-4 object-cover rounded-sm shadow"
                />
                <span className="text-sm font-medium">
                    {getCurrentLanguage().name}
                </span>
                <ChevronDown className="w-4 h-4 transition-transform duration-300 group-hover:rotate-180" />
            </button>

            {/* Dropdown */}
            <div className={`absolute top-full right-0 mt-2 min-w-[180px] ${dropdownBg} backdrop-blur-xl rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0 z-50`}>
                <div className="py-2">
                    {languages.map((lang) => (
                        <button
                            key={lang.code}
                            onClick={() => changeLanguage(lang.code)}
                            className={`w-full text-left px-4 py-2 text-sm transition-all duration-200 flex items-center space-x-3 ${
                                i18n.language === lang.code
                                    ? 'bg-slate-700/50 text-white border-r-2 border-blue-400'
                                    : 'hover:bg-slate-700/50'
                            }`}
                        >
                            <img
                                src={lang.flag}
                                alt={lang.code}
                                className="w-5 h-4 object-cover rounded-sm shadow"
                            />
                            <span className="font-medium">{lang.name}</span>
                            {/*{i18n.language === lang.code && (*/}
                            {/*    <span className="ml-auto text-blue-500"></span>*/}
                            {/*)}*/}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default LanguageSwitcher;
