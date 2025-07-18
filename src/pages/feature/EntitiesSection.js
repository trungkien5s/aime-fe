import { Database } from "lucide-react";
import EntityCard from "./EntityCard";
import {
    MapPin, Mail, Cake, DollarSign, Phone, Clock,
    Building2, Home, Mailbox, CreditCard, Link, Landmark, User
} from "lucide-react";
import { useTranslation } from "react-i18next";

const EntitiesSection = ({ entities, onEntityChange, entitiesMeta }) => {
    const { t } = useTranslation();

    const entityConfigs = [
        { key: "location", icon: <MapPin className="w-5 h-5 text-blue-600" /> },
        { key: "email", icon: <Mail className="w-5 h-5 text-blue-600" /> },
        { key: "age", icon: <Cake className="w-5 h-5 text-blue-600" /> },
        { key: "money", icon: <DollarSign className="w-5 h-5 text-blue-600" /> },
        { key: "phone", icon: <Phone className="w-5 h-5 text-blue-600" /> },
        { key: "time", icon: <Clock className="w-5 h-5 text-blue-600" /> },
        { key: "facility", icon: <Building2 className="w-5 h-5 text-blue-600" /> },
        { key: "address", icon: <Home className="w-5 h-5 text-blue-600" /> },
        { key: "postal_address", icon: <Mailbox className="w-5 h-5 text-blue-600" /> },
        { key: "credit_card", icon: <CreditCard className="w-5 h-5 text-blue-600" /> },
        { key: "url", icon: <Link className="w-5 h-5 text-blue-600" /> },
        { key: "ogranization", icon: <Landmark className="w-5 h-5 text-blue-600" /> },
        { key: "person", icon: <User className="w-5 h-5 text-blue-600" /> },
    ];

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Database className="w-6 h-6 mr-3 text-blue-600" />
                {t("Entity Configuration")}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {entityConfigs.map((config) => {
                    const meta = entitiesMeta[config.key] || {};
                    return (
                        <EntityCard
                            key={config.key}
                            config={{
                                ...config,
                                label: t(meta.display || config.key),
                                operators: meta.operator || [],
                            }}
                            entity={entities[config.key]}
                            onChange={(field, value) => onEntityChange(config.key, field, value)}
                        />
                    );
                })}
            </div>
        </div>
    );
};

export default EntitiesSection;