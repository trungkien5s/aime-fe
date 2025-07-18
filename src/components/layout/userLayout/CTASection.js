// CTA Section Component
import {ChevronRight, Shield} from "lucide-react";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";

const CTASection = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
        setLoading(true);
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 100);

        setTimeout(() => {
            navigate("/feature");
        }, 500);
    };
    return (
        <section className="py-20 px-6 bg-white">
            <div className="container mx-auto text-center">
                <h2 className="text-4xl font-bold text-blue-900 mb-6">
                    Sẵn sàng bảo vệ dữ liệu của bạn?
                </h2>
                <p className="text-xl text-blue-700 mb-8 max-w-2xl mx-auto">
                    Tham gia cùng hàng triệu người dùng tin tướng vào giải pháp bảo mật AI của chúng tôi
                </p>
                <button
                    onClick={handleClick}
                    disabled={loading}
                    className={`px-4 py-2 bg-blue-600 text-white rounded-md transition-all duration-300 shadow-md transform flex items-center space-x-2 text-sm mx-auto 
        ${loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700 hover:scale-105"}
      `}
                >
                    <Shield className="w-5 h-5" />
                    <span>{loading ? "Đang tải..." : "Bắt đầu ngay"}</span>
                    <ChevronRight className="w-4 h-4" />
                </button>
            </div>
        </section>
    );
};
export default CTASection;