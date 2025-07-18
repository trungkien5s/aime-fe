import React from 'react';
import FooterLinkGroup from "./FooterLinkGroup";
import { Shield } from "lucide-react";
import {useTranslation} from "react-i18next";

const Footer = () => {
    const {t} = useTranslation();



    return (
        <footer className="bg-blue-900 text-white py-12 px-6">


                <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
                    <p>{t("Copyright © 2018 - 2025 Aimesoft. All rights reserved.")}</p>
                </div>
        </footer>
    );
};

export default Footer;
