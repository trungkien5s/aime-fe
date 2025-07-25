import {FileText, Upload, X, XCircle} from "lucide-react";
import { useTranslation } from "react-i18next";

const WhitelistSection = ({
                              whitelistFile,
                              setWhitelistFile,
                              isAuthenticated,
                              debugMode,
                              setDebugMode
                          }) => {
    const { t } = useTranslation();

    const handleFileSelect = (e) => {
        if (!isAuthenticated) {
            alert(t("You must be logged in."));
            return;
        }

        const file = e.target.files[0];
        if (file) {
            setWhitelistFile(file);
        }
    };

    const handleClearFile = () => {
        setWhitelistFile(null);
        // Reset input file value (to allow re-selecting same file if needed)
        document.getElementById("whitelist-input").value = "";
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                <FileText className="w-5 h-5 mr-2 text-blue-600" />
                {t("Whitelist Configuration")}
            </h3>

            <div className="space-y-4">
                <p className="text-sm text-gray-600">
                    {t("Upload a whitelist file (.txt) to specify terms that should not be masked")}
                </p>

                <div className="relative">
                    <input
                        type="file"
                        accept=".txt"
                        onChange={handleFileSelect}
                        className="hidden"
                        id="whitelist-input"
                    />
                    <label
                        htmlFor="whitelist-input"
                        className="flex items-center justify-center w-full px-4 py-3 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-colors"
                    >
                        <Upload className="w-5 h-5 text-gray-400 mr-2" />
                        <span className="text-gray-600">
                            {whitelistFile ? whitelistFile.name : t("Choose whitelist file")}
                        </span>
                    </label>
                </div>

                {whitelistFile && (
                    <div className="flex items-center justify-between bg-green-50 text-green-600 text-sm p-2 rounded">
                        <span>{t("Whitelist file loaded")}: {whitelistFile.name}</span>
                        <button
                            onClick={handleClearFile}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                            title={t("Clear file")}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                )}

                <div className="flex items-center pt-4">
                    <input
                        type="checkbox"
                        id="debug-mode"
                        checked={debugMode}
                        onChange={(e) => setDebugMode(e.target.checked)}
                        disabled={!isAuthenticated}
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2 disabled:opacity-50"
                    />
                    <label htmlFor="debug-mode" className="ml-2 text-gray-700">
                        {t("Enable Debug Mode")}
                    </label>
                </div>

            </div>
        </div>
    );
};

export default WhitelistSection;