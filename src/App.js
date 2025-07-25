import { Suspense, useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import FeaturePage from "./pages/homepage/FeaturePage";

import SignInPage from "./pages/users/SignInPage";

import { AuthProvider } from "./components/contexts/AuthContext";
import AdminRoute from "./components/common/AdminRoute";

import DashboardPage from "./pages/admin/dashboard/DashboardPage";
import ManageFile from "./pages/admin/file/ManageFile";
import ProtectedRoute from "./components/contexts/ProtectedRoute";
import AddAccountPage from "./pages/admin/dashboard/AddAccountPage";
import TestPage from "./pages/admin/test/TestPage"
// Tạo Query Client với cấu hình tùy chỉnh
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Thời gian cache (5 phút)
            staleTime: 5 * 60 * 1000,
            // Thời gian giữ cache khi không sử dụng (10 phút)
            gcTime: 10 * 60 * 1000,
            // Retry khi fail
            retry: 3,
            // Retry delay
            retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
            // Refetch khi window focus
            refetchOnWindowFocus: false,
            // Refetch khi reconnect
            refetchOnReconnect: true,
        },
        mutations: {
            // Retry cho mutations
            retry: 1,
            // Retry delay cho mutations
            retryDelay: 1000,
        },
    },
});

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("access_token");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <AuthProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <Routes>
                        {/* Route dành cho người dùng */}
                        <Route path="/" element={<SignInPage />} />
                        <Route path="/home" element={<FeaturePage />} />
                        {/*<Route path="/" element={<HomePage />} />*/}

                        {/* Route dành cho quản trị viên */}
                        <Route
                            path="/admin"
                            element={
                                <AdminRoute>
                                    <DashboardPage />
                                </AdminRoute>
                            }
                        />


                        <Route
                            path="/admin/files"
                            element={
                                <AdminRoute>
                                    <ManageFile />
                                </AdminRoute>
                            }
                        />
                        <Route
                            path="/admin/add-account"
                            element={
                                <AdminRoute>
                                    <AddAccountPage />
                                </AdminRoute>
                            }
                        />

                        <Route
                            path="admin/test"
                            element={
                                <AdminRoute>
                                    <TestPage />
                                </AdminRoute>
                            }
                        />



                    </Routes>
                </Suspense>

                {/* React Query DevTools - chỉ hiển thị trong development */}
                {process.env.NODE_ENV === 'development' && (
                    <ReactQueryDevtools initialIsOpen={false} />
                )}
            </AuthProvider>
        </QueryClientProvider>
    );
}

export default App;