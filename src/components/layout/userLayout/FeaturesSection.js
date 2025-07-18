import FeatureCard from "./FeatureCard";
import {ArrowRight, Eye, Upload, Zap,Lock,Shield} from "lucide-react";

const FeaturesSection = () => {
    const features = [
        {
            icon: Lock,
            title: "Mã hóa tự động",
            // description: "File được mã hóa ngay khi tải lên với thuật toán AES-256 chuẩn quân sự",
            iconBg: "bg-blue-600"
        },
        {
            icon: Shield,
            title: "Bảo mật đa lớp",
            // description: "Hệ thống bảo mật đa lớp với xác thực 2FA và giám sát realtime",
            iconBg: "bg-blue-500"
        },
        {
            icon: Zap,
            title: "Xử lý AI nhanh",
            // description: "Công nghệ AI xử lý và mã hóa file trong vòng giây với độ chính xác cao",
            iconBg: "bg-blue-700"
        }
    ];

    return (
        <section id="features" className="py-20 px-6 bg-blue-50">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-blue-900 mb-4">Tính năng nổi bật</h2>
                    <p className="text-xl text-blue-700 max-w-2xl mx-auto">
                        Giải pháp bảo mật toàn diện với công nghệ AI tiên tiến
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} {...feature} />
                    ))}
                </div>
            </div>
        </section>
    );
};
export default FeaturesSection;