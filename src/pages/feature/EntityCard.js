import { useTranslation } from "react-i18next";

const EntityCard = ({ config, entity, onChange }) => {
    const { t } = useTranslation();

    if (!entity) return null;

    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">{config.icon}</span>
                <h3 className="font-bold text-gray-800">{config.label}</h3>
            </div>

            <div className="space-y-3">
                {/* Masking Type Dropdown */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Masking Type")}
                    </label>
                    <select
                        value={entity.maskType}
                        onChange={(e) => onChange("maskType", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        {(config.operators || []).map((op) => (
                            <option key={op} value={op}>
                                {t(op)}
                            </option>
                        ))}
                        <option value="none">{t("None")}</option>
                    </select>


                </div>

                {/* Substitute Character Input */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Substitute Character")}
                    </label>
                    <input
                        type="text"
                        value={entity.substitute}
                        onChange={(e) => onChange("substitute", e.target.value)}
                        placeholder={t("Enter substitute")}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    />
                </div>
            </div>
        </div>
    );
};

export default EntityCard;