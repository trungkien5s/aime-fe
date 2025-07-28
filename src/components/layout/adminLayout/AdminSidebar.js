import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Home, Film, MessageSquare, Tags, Users, LogOut,File, TestTube, Server  } from 'lucide-react'
import { useAuth } from "../../contexts/AuthContext";

const sidebarLink = [
    { icon: <Users className="w-5 h-5" />, title: "Manage Accounts", url: "/admin" },
    { icon: <File className="w-5 h-5" />, title: "Manage Files", url: "/admin/files" },
    { icon: <Server className="w-5 h-5" />, title: "Test", url: "/admin/test" },

]

const settingsLinks = [
    { icon: <LogOut className="w-5 h-5" />, title: "Log out", url: "/admin/logout" },
]

const AdminSidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const [isMobile, setIsMobile] = useState(false)
    const navigate = useNavigate()
    const location = useLocation()
    const { logout } = useAuth()

    // Detect screen
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 1024)
            if (window.innerWidth >= 1024) setSidebarOpen(false)
        }
        checkMobile()
        window.addEventListener("resize", checkMobile)
        return () => window.removeEventListener("resize", checkMobile)
    }, [setSidebarOpen])

    // Close sidebar on click outside (mobile only)
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                isMobile &&
                sidebarOpen &&
                !event.target.closest(".sidebar-container") &&
                !event.target.closest(".sidebar-toggle")
            ) {
                setSidebarOpen(false)
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isMobile, sidebarOpen, setSidebarOpen])

    useEffect(() => {
        if (isMobile && sidebarOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = "unset"
        }
        return () => {
            document.body.style.overflow = "unset"
        }
    }, [isMobile, sidebarOpen])

    const navLinkClass =
        "flex items-center px-4 py-3 rounded-lg duration-300 text-gray-300 text-sm font-medium hover:bg-white/10 hover:text-white transition-all no-underline group w-full"
    const activeClass = "bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-lg no-underline"

    const closeSidebar = () => setSidebarOpen(false)

    const handleNavigation = (url) => {
        if (url === "/admin/logout") {
            logout()
            navigate("/")
        } else {
            navigate(url)
        }
        if (isMobile) closeSidebar()
    }

    const isActive = (url) => {
        if (url === "/admin") return location.pathname === "/admin"
        return location.pathname.startsWith(url)
    }

    return (
        <>
            {/* Sidebar */}
            <div
                className={`sidebar-container fixed top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-[#1D3557] border-r border-blue-900 transition-all duration-300 ease-in-out z-40
        ${isMobile ? (sidebarOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full") : "translate-x-0"}
        ${isMobile ? "lg:relative lg:translate-x-0 lg:shadow-none lg:top-0 lg:h-screen" : ""}`}
            >
                <div className="flex flex-col h-full">
                    {/* Mobile Header */}
                    {/* Navigation */}
                    <div className="flex-1 flex flex-col px-4 py-6 overflow-y-auto">
                        <nav className="space-y-2">
                            {sidebarLink.map((link) => (
                                <button
                                    key={link.title}
                                    onClick={() => handleNavigation(link.url)}
                                    className={isActive(link.url) ? `${navLinkClass} ${activeClass}` : navLinkClass}
                                >
                                    <div className="flex items-center gap-3 w-full">
                                        <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{link.icon}</span>
                                        <span className="truncate">{link.title}</span>
                                    </div>
                                </button>
                            ))}
                        </nav>

                        <div className="my-6 border-t border-blue-800"></div>

                        <div>
                            <nav className="space-y-2">
                                {settingsLinks.map((link) => (
                                    <button
                                        key={link.title}
                                        onClick={() => handleNavigation(link.url)}
                                        className={isActive(link.url) ? `${navLinkClass} ${activeClass}` : navLinkClass}
                                    >
                                        <div className="flex items-center gap-3 w-full">
                                            <span className="flex-shrink-0 w-5 h-5 flex items-center justify-center">{link.icon}</span>
                                            <span className="truncate">{link.title}</span>
                                        </div>
                                    </button>
                                ))}
                            </nav>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="hidden lg:block p-4 border-t border-blue-800">
                        <div className="text-xs text-blue-300 text-center">© 2024 AimeMask Admin</div>
                    </div>
                    <div className="lg:hidden p-4 border-t border-blue-800">
                        <div className="text-xs text-blue-300 text-center">© 2024 AimeMask</div>
                    </div>
                </div>
            </div>

            {/* Overlay */}
            {isMobile && sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 lg:hidden"
                    onClick={closeSidebar}
                    aria-label="Close sidebar"
                ></div>
            )}
        </>
    )
}

export default AdminSidebar;
