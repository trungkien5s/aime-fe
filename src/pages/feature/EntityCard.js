import { useTranslation } from "react-i18next";
import { useMemo } from "react";

const EntityCard = ({ config, entity, onChange }) => {
    const { t } = useTranslation();

    const maskType = entity?.maskType;

    const renderAdditionalInputs = useMemo(() => {
        if (!entity || maskType === "None") return null;

        const inputs = [];

        if (maskType === "mask_character") {
            inputs.push(
                <div key="start-end" className="flex gap-2">
                    <input
                        type="number"
                        placeholder={t("start_placeholder")}
                        value={entity.start || ""}
                        onChange={(e) => onChange("start", parseInt(e.target.value) || 0)}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        min={0}
                    />
                    <input
                        type="number"
                        placeholder={t("end_placeholder")}
                        value={entity.end || ""}
                        onChange={(e) => onChange("end", parseInt(e.target.value) || 0)}
                        className="w-1/2 px-3 py-2 border border-gray-300 rounded-md text-sm"
                        min={0}
                    />
                </div>
            );
        } else if (
            maskType === "mask_n_first_characters" ||
            maskType === "mask_n_last_characters"
        ) {
            inputs.push(
                <input
                    key="number"
                    type="number"
                    placeholder={t("number_placeholder")}
                    value={entity.numberCharacter || ""}
                    onChange={(e) => onChange("numberCharacter", parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    min={0}
                />
            );
        }

        // Thêm ô nhập ký tự thay thế nếu không phải None
        inputs.push(
            <input
                key="substitute"
                type="text"
                value={entity.substitute || ""}
                onChange={(e) => onChange("substitute", e.target.value)}
                placeholder={t("substitute_placeholder")}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm mt-2"
            />
        );

        return inputs;
    }, [maskType, entity, onChange, t]);

    if (!entity) return null;

    return (
        <div className="bg-gray-50 rounded-lg p-4 border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-center mb-3">
                <span className="text-2xl mr-2">{config.icon}</span>
                <h3 className="font-bold text-gray-800">{config.label}</h3>
            </div>

            <div className="space-y-3">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        {t("Masking Type")}
                    </label>
                    <select
                        value={entity.maskType}
                        onChange={(e) => onChange("maskType", e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                    >
                        {/* Đặt None ở đầu */}
                        <option value="None">{t("None")}</option>
                        {(config.operators || []).map((op) => (
                            <option key={op} value={op}>
                                {t(`${op}`)}
                            </option>
                        ))}
                    </select>
                </div>

                {renderAdditionalInputs}
            </div>
        </div>
    );
};

export default EntityCard;