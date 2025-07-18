import SecurityFeatureItem from "./SecurityFeatureItem";
import {FileText} from "lucide-react";

const SecuritySection = () => {
    const securityFeatures = [
        {
            title: "Mã hóa AES-256",
            description: "Chuẩn mã hóa quân sự được sử dụng bởi các cơ quan chính phủ"
        },
        {
            title: "Zero-Knowledge",
            description: "Chỉ bạn mới có thể truy cập được nội dung file gốc"
        },
        {
            title: "Tự động xóa",
            description: "File được xóa tự động sau thời gian quy định"
        }
    ];

    return (
        <section id="security" className="py-20 px-6 bg-white">
            <div className="container mx-auto">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl font-bold text-blue-900 mb-6">
                            Bảo mật tuyệt đối cho dữ liệu của bạn
                        </h2>
                        <p className="text-xl text-blue-700 mb-8">
                            Với công nghệ mã hóa tiên tiến và AI thông minh, chúng tôi đảm bảo
                            thông tin của bạn luôn được bảo vệ khỏi mọi mối đe dọa.
                        </p>

                        <div className="space-y-4">
                            {securityFeatures.map((feature, index) => (
                                <SecurityFeatureItem key={index} {...feature} />
                            ))}
                        </div>
                    </div>

                    <div className="relative">
                        <div className="bg-blue-50 p-8 rounded-2xl border border-blue-200">
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3">
                                    <FileText className="w-6 h-6 text-blue-600" />
                                    <span className="text-blue-900">document.pdf</span>
                                    <span className="text-green-600 text-sm">✓ Mã hóa</span>
                                </div>
                                <div className="bg-blue-900 p-4 rounded-lg font-mono text-sm text-green-400">
                                    <div>2A7F9C8E1B4D...</div>
                                    <div>8F3A2E9D7C1B...</div>
                                    <div>4E8F2A9C7D1B...</div>
                                </div>
                                <div className="flex items-center justify-between text-sm text-blue-600">
                                    <span>Thuật toán: AES-256</span>
                                    <span>Trạng thái: Bảo mật</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
export default SecuritySection;