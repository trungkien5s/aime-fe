import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import AdminLayout from "../../../components/layout/adminLayout/AdminLayout";
import {Key} from "lucide-react";

const ITEMS_PER_PAGE = 5

const DashboardPage = () => {
    const [accounts, setAccounts] = useState([])
    const [loading, setLoading] = useState(true)
    const [currentPage, setCurrentPage] = useState(1)
    const navigate = useNavigate()
    const apiURL = process.env.REACT_APP_API_URL

    const [selectedAccount, setSelectedAccount] = useState(null);
    const [editForm, setEditForm] = useState({ name: "", role: "" });

    // License key states
    const [showLicenseModal, setShowLicenseModal] = useState(false);
    const [licenseDays, setLicenseDays] = useState(30);
    const [licenseLoading, setLicenseLoading] = useState(false);

    const openEditModal = (account) => {
        setSelectedAccount(account);
        setEditForm({ name: account.name, role: account.role });
    };

    const submitEdit = async () => {
        await handleUpdate(selectedAccount.id, editForm);
        setSelectedAccount(null);
    };

    const openLicenseModal = () => {
        setShowLicenseModal(true);
    };

    const generateLicense = async () => {
        if (!licenseDays || licenseDays <= 0) {
            alert("Please enter a valid number of days");
            return;
        }

        setLicenseLoading(true);
        try {
            const token = localStorage.getItem("access_token");
            const response = await axios.get(`https://aimemaskingdm.aimesoft.com/masking/backend/license/generate-license
`, {
                params: {
                    license_end_days: licenseDays
                },
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Accept': 'application/json'
                },
                responseType: 'blob' // Important for file download
            });

            // Create download link
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'license.key');
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);

            setShowLicenseModal(false);
            setLicenseDays(30); // Reset to default
            alert("License key generated and downloaded successfully!");
        } catch (error) {
            console.error("Failed to generate license:", error);
            alert("Failed to generate license key. Please try again.");
        } finally {
            setLicenseLoading(false);
        }
    };

    useEffect(() => {
        fetchAccounts()
    }, [])

    const fetchAccounts = async () => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.get(`${apiURL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            const results = response.data?.users || []
            const mapped = results.map(user => ({
                ...user,
                username: user.username,
                isActive: true,
            }))
            setAccounts(mapped)
        } catch (error) {
            console.error("Failed to fetch accounts:", error)
        } finally {
            setLoading(false)
        }
    }

    const handleUpdate = async (id, updatedData) => {
        try {
            const token = localStorage.getItem("token")
            const response = await axios.put(`${apiURL}/users/${id}`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            fetchAccounts()
            alert("Update thành công!")
        } catch (error) {
            console.error("Failed to update user:", error)
        }
    }


    const handleDelete = async (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this account?")
        if (!confirmDelete) return

        try {
            await axios.delete(`${apiURL}/users/${id}`)
            setAccounts((prev) => prev.filter((acc) => acc.id !== id))
        } catch (error) {
            console.error("Failed to delete account:", error)
        }
    }

    const totalPages = Math.ceil(accounts.length / ITEMS_PER_PAGE)
    const paginatedAccounts = accounts.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE)

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
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">List Account</h1>
                    <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
                        {/*<button*/}
                        {/*    onClick={handleExport}*/}
                        {/*    className="px-4 py-2 bg-white border border-gray-300 text-black rounded-lg hover:bg-gray-100 transition-colors duration-200 text-sm font-medium"*/}
                        {/*>*/}
                        {/*    Export*/}
                        {/*</button>*/}
                        <button
                            onClick={openLicenseModal}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm font-medium"
                        >
                            <div className="flex items-center">
                                <Key className="w-5 h-5 mr-2" />
                                <span>Generate License</span>
                            </div>

                        </button>
                        <button
                            onClick={() => navigate("/admin/add-account")}
                            className="px-4 py-2 bg-[#1e5eff] text-white rounded-lg hover:bg-blue-600 transition-colors duration-200 text-sm font-medium"
                        >
                            + Add account
                        </button>
                    </div>
                </div>

                {loading ? (
                    <div className="flex justify-center items-center py-12">
                        <div className="text-gray-600">Loading users...</div>
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
                                            Username
                                        </th>
                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Name
                                        </th>
                                        {/*<th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">*/}
                                        {/*    Password*/}
                                        {/*</th>*/}

                                        <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Role
                                        </th>
                                        <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                    {paginatedAccounts.map((account) => (
                                        <tr key={account.id} className="hover:bg-gray-50 transition-colors duration-150">
                                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                {account.username}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{account.name}</td>
                                            {/*<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">{account.password}</td>*/}
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-semibold ${
                                                        account.role === "ADMIN" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {account.role}
                                                </span>
                                            </td>

                                            <td className="px-6 py-4 whitespace-nowrap text-center">
                                                <div className="flex justify-center space-x-2">
                                                    <button
                                                        onClick={() => openEditModal(account)}
                                                        className="p-2 border border-blue-400 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200"
                                                        title="Edit"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="16px"
                                                            viewBox="0 -960 960 960"
                                                            width="16px"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(account.id)}
                                                        className="p-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                                                        title="Delete"
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            height="16px"
                                                            viewBox="0 -960 960 960"
                                                            width="16px"
                                                            fill="currentColor"
                                                        >
                                                            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                        </svg>
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
                                {paginatedAccounts.map((account) => (
                                    <div key={account.id} className="p-4 border-b border-gray-200 last:border-b-0">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="font-semibold text-gray-900">{account.name}</h3>
                                                <p className="text-sm text-gray-600">{account.username}</p>
                                                <p className="text-xs text-gray-500 mt-1">ID: {account.id}</p>
                                            </div>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => openEditModal(account)}
                                                    className="p-2 border border-blue-400 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all duration-200"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="16px"
                                                        viewBox="0 -960 960 960"
                                                        width="16px"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h357l-80 80H200v560h560v-278l80-80v358q0 33-23.5 56.5T760-120H200Zm280-360ZM360-360v-170l367-367q12-12 27-18t30-6q16 0 30.5 6t26.5 18l56 57q11 12 17 26.5t6 29.5q0 15-5.5 29.5T897-728L530-360H360Zm481-424-56-56 56 56ZM440-440h56l232-232-28-28-29-28-231 231v57Zm260-260-29-28 29 28 28 28-28-28Z" />
                                                    </svg>
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(account.id)}
                                                    className="p-2 border border-red-400 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all duration-200"
                                                >
                                                    <svg
                                                        xmlns="http://www.w3.org/2000/svg"
                                                        height="16px"
                                                        viewBox="0 -960 960 960"
                                                        width="16px"
                                                        fill="currentColor"
                                                    >
                                                        <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
                                                    </svg>
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <div className="flex space-x-2">
                                                <span
                                                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                                        account.role === "ADMIN" ? "bg-blue-100 text-blue-800" : "bg-gray-100 text-gray-800"
                                                    }`}
                                                >
                                                    {account.role}
                                                </span>
                                                <span
                                                    className={`inline-flex px-2 py-1 rounded-full text-xs font-semibold ${
                                                        account.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                                                    }`}
                                                >
                                                    {account.isActive ? "Active" : "Inactive"}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Edit Account Modal */}
                        {selectedAccount && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4">Update Account</h2>

                                    <label className="block mb-2 text-sm">Name</label>
                                    <input
                                        type="text"
                                        value={editForm.name}
                                        onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    />

                                    {/*<label className="block mb-2 text-sm">Password</label>*/}
                                    {/*<input*/}
                                    {/*    type="text"*/}
                                    {/*    value={editForm.password}*/}
                                    {/*    onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}*/}
                                    {/*    className="w-full border border-gray-300 rounded px-3 py-2 mb-4"*/}
                                    {/*/>*/}

                                    <label className="block mb-2 text-sm">Role</label>
                                    <select
                                        value={editForm.role}
                                        onChange={(e) => setEditForm({ ...editForm, role: e.target.value })}
                                        className="w-full border border-gray-300 rounded px-3 py-2 mb-4"
                                    >
                                        <option value="user">User</option>
                                        <option value="admin">Admin</option>
                                    </select>


                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setSelectedAccount(null)}
                                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded"
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={submitEdit}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* License Generation Modal */}
                        {showLicenseModal && (
                            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                                <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
                                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                                        <div className="flex items-center">
                                            <Key className="w-5 h-5 mr-2" />
                                            <span>Generate License</span>
                                        </div>
                                    </h2>

                                    <div className="mb-4">
                                        <label className="block mb-2 text-sm font-medium text-gray-700">
                                            License Duration (Days)
                                        </label>
                                        <input
                                            type="number"
                                            min="1"
                                            max="3650"
                                            value={licenseDays}
                                            onChange={(e) => setLicenseDays(parseInt(e.target.value))}
                                            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                            placeholder="Enter number of days"
                                        />
                                        <p className="text-xs text-gray-500 mt-1">
                                            License will expire on: {new Date(Date.now() + (licenseDays * 24 * 60 * 60 * 1000)).toLocaleDateString()}
                                        </p>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
                                        <p className="text-sm text-blue-800">
                                            <strong>Note:</strong> The license key will be automatically downloaded as a .key file.
                                        </p>
                                    </div>

                                    <div className="flex justify-end gap-2">
                                        <button
                                            onClick={() => setShowLicenseModal(false)}
                                            className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded transition-colors"
                                            disabled={licenseLoading}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            onClick={generateLicense}
                                            disabled={licenseLoading}
                                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors disabled:opacity-50"
                                        >
                                            {licenseLoading ? (
                                                <>
                                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                                    Generating...
                                                </>
                                            ) : (
                                                <>
                                                    <div className="flex items-center">
                                                        <Key className="w-5 h-5 mr-2" />
                                                        <span>Generate License</span>
                                                    </div>
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4">
                            <div className="text-sm text-gray-600">
                                Showing {(currentPage - 1) * ITEMS_PER_PAGE + 1} to{" "}
                                {Math.min(currentPage * ITEMS_PER_PAGE, accounts.length)} of {accounts.length} results
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
    )
}

export default DashboardPage