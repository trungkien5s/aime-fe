import { useCallback } from "react";
import { Upload, File, X, AlertCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

const FileUpload = ({ uploadedFile, setUploadedFile, isAuthenticated, language }) => {
    const acceptedFormats = [".txt", ".pdf", ".xlsx", ".docx", ".pptx"];
    const MAX_FILE_SIZE = 1000 * 1024; // 1000KB (1MB)
    const { t } = useTranslation();

    const validateFile = (file) => {
        if (file.size > MAX_FILE_SIZE) {
            alert(t("File must be less than 1MB."));
            return false;
        }
        return true;
    };

    const handleFiles = (files) => {
        if (!files || files.length === 0) return;

        const file = files[0];
        if (validateFile(file)) {
            setUploadedFile(file);
        }
    };

    const handleDrop = useCallback(
        (e) => {
            e.preventDefault();
            if (!isAuthenticated) {
                alert(language === "ja" ? "ログインが必要です。" : "You must be logged in.");
                return;
            }

            const files = e.dataTransfer.files;
            handleFiles(files);
        },
        [isAuthenticated, language]
    );

    const handleDragOver = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragEnter = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragLeave = useCallback((e) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleFileSelect = (e) => {
        if (!isAuthenticated) {
            alert(t("You must be logged in."));
            return;
        }

        const files = e.target.files;
        handleFiles(files);
    };

    const removeFile = () => {
        setUploadedFile(null);
        // Reset file input
        const fileInput = document.getElementById("file-input");
        if (fileInput) {
            fileInput.value = "";
        }
    };

    const formatFileSize = (bytes) => {
        if (bytes === 0) return "0 Bytes";
        const k = 1024;
        const sizes = ["Bytes", "KB", "MB", "GB"];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
    };

    return (
        <div className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 flex items-center">
                <Upload className="w-6 h-6 mr-3 text-blue-600" />
                {t("File Upload")}
            </h2>

            {!uploadedFile ? (
                <div
                    className="border-2 border-dashed border-blue-300 rounded-lg p-12 text-center hover:border-blue-400 transition-colors cursor-pointer bg-blue-50/50"
                    onDrop={handleDrop}
                    onDragOver={handleDragOver}
                    onDragEnter={handleDragEnter}
                    onDragLeave={handleDragLeave}
                    onClick={() => document.getElementById("file-input").click()}
                >
                    <Upload className="w-16 h-16 text-blue-400 mx-auto mb-4" />
                    <p className="text-lg text-gray-700 mb-2">
                        {t("Drag and drop your file here, or click to browse")}
                    </p>
                    <p className="text-sm text-gray-500 mb-4">
                        {t("Supported formats")}: {acceptedFormats.join(", ")}
                    </p>
                    <div className="flex items-center justify-center text-xs text-gray-400">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {t("Maximum file size")}: {formatFileSize(MAX_FILE_SIZE)}
                    </div>
                    <input
                        id="file-input"
                        type="file"
                        className="hidden"
                        accept={acceptedFormats.join(",")}
                        onChange={handleFileSelect}
                    />
                </div>
            ) : (
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <File className="w-8 h-8 text-green-600 mr-3" />
                            <div>
                                <p className="font-medium text-green-800">{uploadedFile.name}</p>
                                <p className="text-sm text-green-600">
                                    {formatFileSize(uploadedFile.size)}
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={removeFile}
                            className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                            title={t("Remove file")}
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            )}

            {/* File requirements info */}
            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                    {t("File Requirements")}:
                </h4>
                <ul className="text-xs text-gray-600 space-y-1">
                    <li>• {t("Maximum file size")}: {formatFileSize(MAX_FILE_SIZE)}</li>
                    <li>• {t("Supported formats")}: {acceptedFormats.join(", ")}</li>
                    <li>• {t("Please ensure your file is not password protected")}</li>
                </ul>
            </div>
        </div>
    );
};

export default FileUpload;