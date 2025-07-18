import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const location = useLocation();

    // Chỉ dùng để check token có hợp lệ (format, hết hạn chưa)
    const validateToken = (token) => {
        try {
            if (!token || !token.includes(".")) return false;
            const payload = JSON.parse(atob(token.split(".")[1]));
            const currentTime = Math.floor(Date.now() / 1000);
            return !payload.exp || payload.exp >= currentTime;
        } catch (error) {
            console.error("Token validation failed:", error);
            return false;
        }
    };

    // Khi app khởi động hoặc route thay đổi
    useEffect(() => {
        const checkAuthStatus = async () => {
            const token = localStorage.getItem("access_token");
            const userInfo = localStorage.getItem("user");

            if (!token || !validateToken(token)) {
                clearAuthData();
                setLoading(false);
                return;
            }

            if (userInfo) {
                setUser(JSON.parse(userInfo));
                setIsAuthenticated(true);
            } else {
                // Token hợp lệ nhưng không có userInfo → lỗi
                clearAuthData();
            }

            setLoading(false);
        };

        checkAuthStatus();
    }, [location.pathname]);

    // Updated login function to match backend response structure
    const login = async (loginResponse) => {
        try {
            // Extract data from backend response
            const { access_token, id, name, role } = loginResponse;

            // Lưu token
            localStorage.setItem("access_token", access_token);

            // Create user info object matching backend structure
            const userInfo = {
                id: id,
                name: name,
                role: role,
            };

            localStorage.setItem("user", JSON.stringify(userInfo));
            setUser(userInfo);
            setIsAuthenticated(true);

            console.log("Đăng nhập thành công:", userInfo);
        } catch (error) {
            console.error("Error during login:", error);
            clearAuthData();
        }
    };

    const logout = () => {
        clearAuthData();
        alert("You have been logged out successfully!");
        window.location.href = "/";
    };

    const clearAuthData = () => {
        setUser(null);
        setIsAuthenticated(false);
        localStorage.removeItem("access_token");
        localStorage.removeItem("user");
    };

    // Interceptor: tự thêm token vào axios
    useEffect(() => {
        const requestInterceptor = axios.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem("access_token");
                if (token) {
                    config.headers.Authorization = `Bearer ${token}`;
                }
                return config;
            },
            (error) => Promise.reject(error)
        );

        const responseInterceptor = axios.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response?.status === 401) {
                    const errorData = error.response.data;
                    if (
                        errorData?.detail?.includes("token") ||
                        errorData?.message?.includes("token") ||
                        errorData?.detail?.includes("expired")
                    ) {
                        console.warn("Token expired/invalid - logging out");
                        clearAuthData();
                        if (!window.location.pathname.includes("/auth/")) {
                            window.location.href = "/";
                        }
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axios.interceptors.request.eject(requestInterceptor);
            axios.interceptors.response.eject(responseInterceptor);
        };
    }, []);

    const refreshUser = () => {
        const userInfo = localStorage.getItem("user");
        if (userInfo) {
            setUser(JSON.parse(userInfo));
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isAuthenticated,
                loading,
                login,
                logout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth phải được dùng bên trong AuthProvider");
    }
    return context;
}