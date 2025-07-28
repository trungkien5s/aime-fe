import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FileText, Download, Trash2, Upload } from "lucide-react";
import AdminLayout from "../../../components/layout/adminLayout/AdminLayout";

const ITEMS_PER_PAGE = 5

const ManageFile = () => {
    const [files, setFiles] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()
    const apiURL = process.env.REACT_APP_API_URL

    const [selectedFile, setSelectedFile] = useState(null);
    const [editForm, setEditForm] = useState({ fileName: "", description: "" });

    // Sample data - replace with actual API calls
    const sampleFiles = [
        {
            id: 1,
            fileName: "document1.pdf",
            originalName: "Important Document.pdf",
            fileSize: "2.5 MB",
            fileType: "PDF",
            uploader: "TrungKien",
            uploaderId: 1,
            uploadTime: "2024-01-15 10:30:00",
        },
        {
            id: 2,
            fileName: "image1.jpg",
            originalName: "Profile Picture.jpg",
            fileSize: "1.2 MB",
            fileType: "Image",
            uploader: "Aimee",
            uploaderId: 2,
            uploadTime: "2024-01-14 15:45:00",
        },
        {
            id: 3,
            fileName: "report.xlsx",
            originalName: "Monthly Report.xlsx",
            fileSize: "3.8 MB",
            fileType: "Excel",
            uploader: "Soft",
            uploaderId: 3,
            uploadTime: "2024-01-13 09:15:00",
        },
        {
            id: 4,
            fileName: "presentation.pptx",
            originalName: "Project Presentation.pptx",
            fileSize: "15.2 MB",
            fileType: "PowerPoint",
            uploader: "Aimess",
            uploaderId: 4,
            uploadTime: "2024-01-12 14:20:00",
        },
        {
            id: 5,
            fileName: "data.csv",
            originalName: "Customer Data.csv",
            fileSize: "856 KB",
            fileType: "CSV",
            uploader: "Sosr",
            uploaderId: 5,
            uploadTime: "2024-01-11 11:30:00",
        },
        {
            id: 6,
            fileName: "video.mp4",
            originalName: "Training Video.mp4",
            fileSize: "125 MB",
            fileType: "Video",
            uploader: "Liver",
            uploaderId: 6,
            uploadTime: "2024-01-10 16:45:00",
        }
    ];


    useEffect(() => {
        fetchFiles()
    }, [])

    const fetchFiles = async () => {
        try {
            // Replace this with actual API call
            // const token = localStorage.getItem("token")
            // const response = await axios.get(`${apiURL}/files`, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // })
            
            // For now, using sample data
            setTimeout(() => {
                setFiles(sampleFiles)
                setLoading(false)
            }, 1000)
            
        } catch (error) {
            console.error("Failed to fetch files:", error)
            setLoading(false)
        }
    }

    const handleUpdate = async (id, updatedData) => {
        try {
            // const token = localStorage.getItem("token")
            // const response = await axios.put(`${apiURL}/files/${id}`, updatedData, {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // })

            // For demo purposes, update local state
            setFiles(prev => prev.map(file => 
                file.id === id 
                    ? { ...file, originalName: updatedData.fileName, description: updatedData.description }
                    : file
            ));
            
            alert("File updated successfully!")
        } catch (error) {
            console.error("Failed to update file:", error)
            alert("Failed to update file")
        }
    }

    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this file?")
        if (!confirmDelete) return

        try {
            // await axios.delete(`${apiURL}/files/${id}`)
            setFiles((prev) => prev.filter((file) => file.id !== id))
            alert("File deleted successfully!")
        } catch (error) {
            console.error("Failed to delete file:", error)
            alert("Failed to delete file")
        }
    }

    const handleDownload = (file) => {
        // Implement file download logic
        alert(`Downloading ${file.originalName}...`)
        // In real implementation:
        // window.open(`${apiURL}/files/download/${file.id}`, '_blank')
    }

    const formatFileSize = (size) => {
        return size; // Already formatted in sample data
    }

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        });
    }

    const getFileIcon = (fileType) => {
        switch (fileType.toLowerCase()) {
            case 'pdf':
                return <FileText className="w-5 h-5 text-red-500" />;
            case 'image':
                return <FileText className="w-5 h-5 text-green-500" />;
            case 'excel':
                return <FileText className="w-5 h-5 text-green-600" />;
            case 'powerpoint':
                return <FileText className="w-5 h-5 text-orange-500" />;
            case 'csv':
                return <FileText className="w-5 h-5 text-blue-500" />;
            case 'video':
                return <FileText className="w-5 h-5 text-purple-500" />;
            default:
                return <FileText className="w-5 h-5 text-gray-500" />;
        }
    }

    const totalPages = Math.ceil(files.length / ITEMS_PER_PAGE)
    const paginatedFiles = files.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

    const handlePrevPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1)
    }

    const handleNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1)
    }

    return (
        <AdminLayout>
            <div className="p-4 sm:p-6 max-w-7xl mx-auto">
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Files</h1>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-gray-600">Loading files...</div>
                    </div>
                ) : (
                    <>
                        {/* Table Section */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            {/* Desktop Table */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="min-w-full">
                                    <thead className="bg-gray-200 border-b border-gray-200">
                                    <tr>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            File
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Size
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Uploader
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Upload Time
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedFiles.map((file) => (
                                        <tr key={file.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center">
                                                    {getFileIcon(file.fileType)}
                                                    <div className="ml-3">
                                                        <div className="text-sm font-medium text-gray-900">
                                                            {file.originalName}
                                                        </div>
                                                        <div className="text-sm text-gray-500">
                                                            {file.fileType}
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {file.fileSize}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                <span
                                                    className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800"
                                                >
                                                    {file.uploader}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                                {formatDate(file.uploadTime)}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => handleDownload(file)}
                                                        className="p-2 border border-green-400 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200"
                                                        title="Download"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(file.id)}
                                                        className="p-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                                                        title="Delete"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Mobile Cards */}
                            <div className="md:hidden">
                                {paginatedFiles.map((file) => (
                                    <div key={file.id} className="p-4 border-b border-gray-200 last:border-b-0">
                                        <div className="flex justify-between items-start mb-3">
                                            <div className="flex items-start space-x-3">
                                                {getFileIcon(file.fileType)}
                                                <div>
                                                    <h3 className="font-semibold text-gray-900">{file.originalName}</h3>
                                                    <p className="text-sm text-gray-600">{file.fileType} • {file.fileSize}</p>
                                                </div>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleDownload(file)}
                                                    className="p-2 border border-green-400 text-green-500 rounded-lg hover:bg-green-500 hover:text-white transition-all duration-200"
                                                >
                                                    <Download className="w-4 h-4" />
                                                </button>
                                
                                                <button
                                                    onClick={() => handleDelete(file.id)}
                                                    className="p-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-gray-600">
                                            <span
                                                    className="inline-flex px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800"
                                                >
                                                    Uploaded by: {file.uploader}
                                                    </span>
                                            <span>{formatDate(file.uploadTime)}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Edit File Modal */}
                        {selectedFile && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Update File</h2>

                                    <label className="block mb-2 text-sm">File Name</label>
                                    <input
                                        type="text"
                                        value={editForm.fileName}
                                        onChange={(e) => setEditForm({ ...editForm, fileName: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    />

                                    <label className="block mb-2 text-sm">Description</label>
                                    <textarea
                                        value={editForm.description}
                                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4 h-20 resize-none"
                                        placeholder="Enter file description"
                                    />

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedFile(null)}
                                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                            <div className="text-sm text-gray-600">
                                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                                {Math.min(currentPage * ITEMS_PER_PAGE, files.length)} of {files.length} results
                            </div>
                            <div className="flex items-center space-x-2">
                                <button
                                    onClick={handlePrevPage}
                                    disabled={currentPage === 1}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    Previous
                                </button>
                                <span className="px-4 py-2 text-sm text-gray-700">
                                    Page {currentPage} of {totalPages}
                                </span>
                                <button
                                    onClick={handleNextPage}
                                    disabled={currentPage === totalPages}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </AdminLayout>
    );
};

export default ManageFile;