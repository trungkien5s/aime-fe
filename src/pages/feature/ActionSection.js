import { Play, Bug, Loader2 } from "lucide-react"
import { useTranslation } from "react-i18next";

const ActionSection = ({ debugMode, setDebugMode, onMasking, disabled, isProcessing = false }) => {
    const { t } = useTranslation();

    const getButtonText = () => {
        if (isProcessing) {
            return t("Processing...");
        }
        if (disabled) {
            return t("Upload a file to start");
        }
        return t("START MASKING");
    };

    const getButtonIcon = () => {
        if (isProcessing) {
            return <Loader2 className="w-5 h-5 mr-2 animate-spin" />;
        }
        return <Play className="w-5 h-5 mr-2" />;
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("Processing Options")}
            </h3>

            <div className="space-y-6">


                <button
                    onClick={onMasking}
                    disabled={disabled || isProcessing}
                    className={`w-full flex items-center justify-center px-6 py-4 rounded-lg font-semibold text-white transition-all ${
                        disabled || isProcessing
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    }`}
                >
                    {getButtonIcon()}
                    {getButtonText()}
                </button>

                {isProcessing && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <div className="flex items-center justify-center">
                            <Loader2 className="w-5 h-5 mr-2 animate-spin text-blue-600" />
                            <span className="text-blue-800 font-medium">
                                {t("Processing your file, please wait...")}
                            </span>
                        </div>
                        <p className="text-sm text-blue-600 text-center mt-2">
                            {t("This may take a few moments depending on file size")}
                        </p>
                    </div>
                )}

                {(disabled && !isProcessing) && (
                    <p className="text-sm text-gray-500 text-center">
                        {t("Please upload a file before processing")}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ActionSection;