import { useState, useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Eye, EyeOff, Lock, User, AlertCircle, CheckCircle2 } from "lucide-react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import AuthLayout from "../../components/auth/AuthLayout";
import { useAuth } from "../../components/contexts/AuthContext";
import { useTranslation } from "react-i18next";

const SignInPage = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();
    const { t } = useTranslation();

    // Kiểm tra xem người dùng đã đăng nhập hay chưa
    useEffect(() => {
        if (isAuthenticated) {
            // Redirect về trang chủ nếu đã đăng nhập
            navigate("/home", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    // Schema with translated messages
    const schema = yup.object({
        username: yup.string().required(t('Username or email is required')),
        password: yup.string().required(t('Password is required')),
    });

    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        mode: "onSubmit",
    });

    const apiURL = process.env.REACT_APP_API_URL;

    // API function - Updated to handle the backend response structure
    const signInUser = async (credentials) => {
        const payload = {
            username: credentials.username,
            password: credentials.password,
        };

        console.log("API URL ===>", apiURL);
        console.log("Calling API:", `${apiURL}/login`);

        // Create form data for x-www-form-urlencoded
        const formData = new URLSearchParams();
        formData.append('username', credentials.username);
        formData.append('password', credentials.password);

        const response = await axios.post(`${apiURL}/login`, formData, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
            },
        });

        // Check for successful response (200 or 201)
        if (response.status !== 200 && response.status !== 201) {
            throw new Error(`Login failed: Status ${response.status}`);
        }

        const responseData = response.data;
        console.log("Response data:", responseData);

        // Validate response structure
        if (!responseData.access_token) {
            throw new Error("Access token is missing from server response.");
        }

        // Return the complete response data matching backend structure:
        // {
        //   "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
        //   "token_type": "bearer",
        //   "id": 1,
        //   "name": "Admin Aimesoft",
        //   "role": "admin"
        // }
        return {
            access_token: responseData.access_token,
            token_type: responseData.token_type,
            id: responseData.id,
            name: responseData.name,
            role: responseData.role
        };

    };

    // React Query mutation - Updated to handle the new response structure
    const signInMutation = useMutation({
        mutationFn: signInUser,
        onSuccess: async (userData) => {
            await login(userData);

            if (userData.role === "admin") {
                navigate("/admin");
            } else {
                navigate("/home");
            }
        },

        onError: (error) => {
            console.error("Sign in error:", error);
        }
    });

    const handleSignIn = async (values) => {
        signInMutation.mutate(values);
    };

    // Format error message
    const getErrorMessage = (error) => {
        if (!error) return "";

        let errorMsg = t('An error occurred.');

        if (error.response) {
            const errorData = error.response.data;
            if (typeof errorData === "string") {
                errorMsg = errorData;
            } else if (errorData?.detail) {
                errorMsg = typeof errorData.detail === "string"
                    ? errorData.detail
                    : errorData.detail.map(err => err.msg || JSON.stringify(err)).join("\n");
            } else if (errorData?.message) {
                errorMsg = errorData.message;
            }

            if (error.response.status === 401) {
                errorMsg = t('Invalid login credentials.');
            } else if (error.response.status === 422) {
                errorMsg = "Invalid data: " + errorMsg;
            } else if (error.response.status === 400) {
                errorMsg = "Bad request: " + errorMsg;
            }
        } else {
            errorMsg = t('Unable to connect to server. Please try again.');
        }

        return errorMsg;
    };

    // Nếu đang kiểm tra trạng thái đăng nhập, hiển thị loading
    if (isAuthenticated === undefined) {
        return (
            <AuthLayout title={t('Loading...')}>
                <div className="flex items-center justify-center py-8">
                    <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin"></div>
                </div>
            </AuthLayout>
        );
    }

    // Nếu đã đăng nhập, không hiển thị form (useEffect sẽ redirect)
    if (isAuthenticated) {
        return null;
    }

    return (
        <AuthLayout title={t('Sign In')}>
            <form onSubmit={handleSubmit(handleSignIn)} className="space-y-6">
                {signInMutation.isError && (
                    <div className="relative">
                        <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-sm"></div>
                        <div className="relative bg-blue-500/10 border border-blue-500/30 text-blue-300 px-4 py-4 rounded-xl text-sm flex items-center space-x-3 backdrop-blur-sm">
                            <AlertCircle className="w-5 h-5 flex-shrink-0" />
                            <span className="font-medium">{getErrorMessage(signInMutation.error)}</span>
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <User className="w-4 h-4" />
                        <span>{t('Username')}</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("username")}
                            type="text"
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 rounded-xl focus:bg-slate-800/70 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder={t('Enter your username')}
                        />
                    </div>
                    {errors.username && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.username.message}</span>
                        </p>
                    )}
                </div>

                <div className="space-y-2">
                    <label className="text-slate-300 text-sm font-medium flex items-center space-x-2">
                        <Lock className="w-4 h-4" />
                        <span>{t('Password')}</span>
                    </label>
                    <div className="relative group">
                        <input
                            {...register("password")}
                            type={showPassword ? "text" : "password"}
                            className="w-full bg-slate-800/50 border border-slate-600/50 text-white px-4 py-4 pr-12 rounded-xl focus:bg-slate-800/70 focus:border-blue-500/50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 placeholder-slate-400 transition-all duration-300 group-hover:border-slate-500/70"
                            placeholder={t('Enter your password')}
                        />
                        <button
                            type="button"
                            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white transition-colors duration-300 p-1"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                    </div>
                    {errors.password && (
                        <p className="text-red-400 text-sm flex items-center space-x-2">
                            <AlertCircle className="w-4 h-4" />
                            <span>{errors.password.message}</span>
                        </p>
                    )}
                </div>

                <div className="flex items-center justify-between">
                    <label className="flex items-center space-x-3 cursor-pointer group">
                        <div className="relative">
                            <input
                                type="checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                                className="sr-only"
                            />
                            <div
                                className={`w-5 h-5 rounded border-2 transition-all duration-300 ${
                                    rememberMe ? "bg-blue-500 border-blue-500" : "border-slate-500 group-hover:border-slate-400"
                                }`}
                            >
                                {rememberMe && <CheckCircle2 className="w-3 h-3 text-white m-0.5" />}
                            </div>
                        </div>
                        <span className="text-slate-300 text-sm font-medium group-hover:text-white transition-colors duration-300">
                            {t('Remember me')}
                        </span>
                    </label>
                </div>

                <button
                    type="submit"
                    disabled={signInMutation.isPending}
                    className="relative w-full group overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-500 to-blue-600 rounded-xl transition-all duration-300 group-hover:from-blue-500 group-hover:via-blue-400 group-hover:to-blue-500"></div>
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-white/20 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                    <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 text-white py-4 px-6 rounded-xl font-semibold text-base transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/25 group-disabled:opacity-50 group-disabled:cursor-not-allowed">
                        {signInMutation.isPending ? (
                            <div className="flex items-center justify-center space-x-3">
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                <span>{t('Signing in...')}</span>
                            </div>
                        ) : (
                            <span>{t('Sign In')}</span>
                        )}
                    </div>
                </button>
            </form>
        </AuthLayout>
    );
};

export default SignInPage;