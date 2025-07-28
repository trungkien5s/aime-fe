import { useState, useCallback, useEffect } from "react"
import Header from "../../components/layout/userLayout/Header";
import Footer from "../../components/layout/userLayout/Footer";
import { useAuth } from "../../components/contexts/AuthContext";
import FileUpload from "../feature/FileUpload";
import EntitiesSection from "../feature/EntitiesSection";
import WhitelistSection from "../feature/WhitelistSection";
import ActionSection from "../feature/ActionSection";
import { useTranslation } from "react-i18next";

const FeaturePage = ({ onProcess, className = "" }) => {
    const [language, setLanguage] = useState("en");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [whitelistFile, setWhitelistFile] = useState(null);
    const [debugMode, setDebugMode] = useState(false);
    const [entities, setEntities] = useState({});
    const [entitiesMeta, setEntitiesMeta] = useState({});
    const [profiles, setProfiles] = useState({});
    const [isProcessing, setIsProcessing] = useState(false);

    const { isAuthenticated } = useAuth();
    const { t } = useTranslation();

    const API_URL = process.env.REACT_APP_API_URL;

    // Fetch entities metadata from API
    const fetchEntitiesMeta = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const res = await fetch(`${API_URL}/get_entities`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setEntitiesMeta(data?.entities || {});

            // Init entity states với giá trị mặc định là "mask_all_character"
            const initialEntities = {};
            Object.keys(data?.entities || {}).forEach((key) => {
                initialEntities[key] = {
                    maskType: "mask_all_character", // Đặt mặc định là "mask_all_character"
                    substitute: "",
                    start: "",
                    end: "",
                    numberCharacter: ""
                };
            });

            setEntities(initialEntities);
        } catch (error) {
            console.error("Failed to fetch entities meta:", error);
        }
    };

    // Fetch profiles from API
    const fetchProfiles = async () => {
        try {
            const token = localStorage.getItem("access_token");
            const res = await fetch(`${API_URL}/get_profiles`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            const data = await res.json();
            setProfiles(data?.profiles || {});
        } catch (error) {
            console.error("Failed to fetch profiles:", error);
        }
    };

    useEffect(() => {
        fetchEntitiesMeta();
        fetchProfiles();
    }, []);

    const handleEntityChange = (entityKey, field, value) => {
        setEntities((prev) => ({
            ...prev,
            [entityKey]: {
                ...prev[entityKey],
                [field]: value,
            },
        }));
    };

    const getSelectedEntitiesForAPI = () => {
        const selectedEntities = {};

        Object.entries(entities).forEach(([entityKey, entity]) => {
            const { maskType, start, end, numberCharacter, substitute } = entity;

            // Kiểm tra nếu maskType là None thì bỏ qua entity này
            if (!maskType || maskType === "None" || maskType === "") {
                return; // Skip this entity completely
            }

            const rule = { method: maskType };

            // Xử lý theo từng loại mask
            switch (maskType) {
                case "mask_character":
                    rule.start = parseInt(start) || 0;
                    rule.end = parseInt(end) || 0;
                    break;

                case "mask_n_first_characters":
                case "mask_n_last_characters":
                    rule.number_character = parseInt(numberCharacter);
                    if (isNaN(rule.number_character)) rule.number_character = 1;
                    break;
            }

            // Thêm ký tự thay thế nếu có
            if (typeof substitute === "string" && substitute.trim()) {
                rule.substitute_character = substitute.trim();
            }

            // Chỉ thêm vào selectedEntities nếu maskType không phải là None
            selectedEntities[entityKey] = rule;
        });

        console.log('Selected entities for API:', selectedEntities); // Debug log
        return selectedEntities;
    };


    // Function to process and clean the downloaded file content
    const processDownloadedFile = async (blob) => {
        try {
            // Check if it's a zip file
            if (blob.type === 'application/zip' || blob.type === 'application/x-zip-compressed') {
                // For zip files, we can't easily process the content here
                // You might need to use a zip library like JSZip
                return blob;
            }

            // For text files, we can process the content
            const text = await blob.text();


            const cleanedText = text
                .replace(/re\.phone\s*/g, '')
                .replace(/\s+/g, ' ')          // Replace multiple spaces with single space
                .trim();                       // Remove leading/trailing spaces

            console.log('Original text sample:', text.substring(0, 200));
            console.log('Cleaned text sample:', cleanedText.substring(0, 200));

            // Create a new blob with the cleaned content
            return new Blob([cleanedText], { type: blob.type });
        } catch (error) {
            console.error('Error processing file content:', error);
            return blob; // Return original blob if processing fails
        }
    };

    const downloadFile = async (blob, filename) => {
        try {
            // Process the file content to remove "re.phone"
            const processedBlob = await processDownloadedFile(blob);

            const url = window.URL.createObjectURL(processedBlob);
            const a = document.createElement("a");
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            a.href = url;
            a.download = `${filename}_${timestamp}.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Error in downloadFile:', error);
            // Fallback to original download if processing fails
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
            a.href = url;
            a.download = `${filename}_${timestamp}.zip`;
            document.body.appendChild(a);
            a.click();
            a.remove();
            window.URL.revokeObjectURL(url);
        }
    };

    const pollJobStatus = async (jobId) => {
        return new Promise((resolve, reject) => {
            const checkInterval = setInterval(async () => {
                try {
                    const token = localStorage.getItem("access_token");
                    const response = await fetch(`${API_URL}/mask_profile/status/${jobId}`, {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    });

                    if (!response.ok) {
                        clearInterval(checkInterval);
                        reject(new Error(`HTTP ${response.status}: ${response.statusText}`));
                        return;
                    }

                    const statusData = await response.json();
                    console.log('Job status:', statusData); // Debug log

                    if (statusData.status === "done" || statusData.status === "completed") {
                        clearInterval(checkInterval);
                        resolve(jobId);
                    } else if (statusData.status === "failed" || statusData.status.startsWith("error")) {
                        clearInterval(checkInterval);
                        reject(new Error(statusData.message || statusData.status));
                    } else if (statusData.status === "in_progress" || statusData.status === "processing") {
                        // Continue polling
                        console.log('Job still processing...');
                    } else {
                        // Unknown status
                        console.log('Unknown status:', statusData.status);
                    }
                } catch (error) {
                    clearInterval(checkInterval);
                    reject(error);
                }
            }, 3000); // Poll every 3 seconds

            // Set timeout to avoid infinite polling
            setTimeout(() => {
                clearInterval(checkInterval);
                reject(new Error('Job processing timeout'));
            }, 300000); // 5 minutes timeout
        });
    };

    const handleMasking = async () => {
        if (!uploadedFile) {
            alert(t("Please select a file."));
            return;
        }

        setIsProcessing(true);

        try {
            const selectedEntities = getSelectedEntitiesForAPI();

            // Check if we have any entities selected
            if (Object.keys(selectedEntities).length === 0) {
                alert(t("Please select at least one entity to mask."));
                setIsProcessing(false);
                return;
            }

            // Warning for multiple entity selection


            const formData = new FormData();
            formData.append("file", uploadedFile);

            // Add priority to entities (optional - if API supports it)
            const entitiesWithPriority = {};
            const entityKeys = Object.keys(selectedEntities);

            // Set priority based on specificity (more specific entities get higher priority)
            const priorityMap = {
                'email': 1,
                'phone': 2,
                'time': 3,
                'money': 4,
                'age': 5,
                'location': 6,
                'name_other': 7,
                'disease': 8,
                'natural_object': 9,
                'god': 10,
                'event': 11,
                'color': 12,
                'periodx': 13,
                'measurement': 14
            };

            entityKeys.forEach(entityKey => {
                const rule = selectedEntities[entityKey];
                if (priorityMap[entityKey] !== undefined) {
                    rule.priority = priorityMap[entityKey];
                }
                entitiesWithPriority[entityKey] = rule;
            });

            // Log the entities data being sent
            const entitiesPayload = { entities: entitiesWithPriority };
            console.log('Entities payload being sent:', entitiesPayload); // Debug log

            formData.append("entities", JSON.stringify(entitiesPayload));
            if (whitelistFile) formData.append("whitelist", whitelistFile);

            const debugParam = debugMode ? "?debug=true" : "";
            const token = localStorage.getItem("access_token");

            console.log('Uploading file for processing...'); // Debug log

            const response = await fetch(`${API_URL}/mask_profile${debugParam}`, {
                method: "POST",
                body: formData,
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP ${response.status}: ${response.statusText}`);
            }

            const contentType = response.headers.get("content-type");
            if (!contentType || !contentType.includes("application/json")) {
                const rawText = await response.text();
                throw new Error("Expected JSON, but received: " + rawText);
            }

            const data = await response.json();
            console.log('Upload response:', data); // Debug log

            if (!data.job_id) {
                throw new Error("Did not receive job_id from the server. Response: " + JSON.stringify(data));
            }

            console.log('Starting job polling for job_id:', data.job_id); // Debug log

            // Poll for job completion
            const jobId = await pollJobStatus(data.job_id);

            console.log('Job completed, downloading file...'); // Debug log

            // Download the result
            const downloadResponse = await fetch(`${API_URL}/mask_profile/download/${jobId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            if (!downloadResponse.ok) {
                const errorText = await downloadResponse.text();
                throw new Error(`Download failed: ${downloadResponse.status} - ${errorText}`);
            }

            // Check if the response is actually a file (blob)
            const contentType2 = downloadResponse.headers.get("content-type");
            console.log('Download response content-type:', contentType2); // Debug log

            const blob = await downloadResponse.blob();

            if (blob.size === 0) {
                throw new Error("Downloaded file is empty");
            }

            console.log('File downloaded successfully, size:', blob.size); // Debug log

            // Call the modified downloadFile function which will process the content
            await downloadFile(blob, uploadedFile.name);

            alert(t("File processed and downloaded successfully!"));

        } catch (error) {
            console.error("Error during masking process:", error);
            alert(t("Something went wrong during processing: ") + error.message);
        } finally {
            setIsProcessing(false);
        }
    };

    return (
        <>
            <Header />
            <div className="space-y-8">
                <FileUpload
                    uploadedFile={uploadedFile}
                    setUploadedFile={setUploadedFile}
                    isAuthenticated={isAuthenticated}
                    language={language}
                />
                <EntitiesSection
                    entities={entities}
                    onEntityChange={handleEntityChange}
                    entitiesMeta={entitiesMeta}
                />
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <WhitelistSection
                        whitelistFile={whitelistFile}
                        setWhitelistFile={setWhitelistFile}
                        isAuthenticated={isAuthenticated}
                        debugMode={debugMode}
                        setDebugMode={setDebugMode}
                    />
                    <ActionSection
                        onMasking={handleMasking}
                        disabled={!uploadedFile || isProcessing}
                        isProcessing={isProcessing}
                    />
                </div>
            </div>
            <Footer />
        </>
    );
};

export default FeaturePage;