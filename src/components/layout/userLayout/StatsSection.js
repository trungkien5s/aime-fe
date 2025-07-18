import StatsItem from "./StatsItem";

const StatsSection = () => {
    const stats = [
        { value: "99.9%", label: "Thời gian hoạt động", color: "text-blue-600" },
        { value: "10M+", label: "File được bảo mật", color: "text-blue-700" },
        { value: "256-bit", label: "Mã hóa quân sự", color: "text-blue-800" }
    ];

    return (
        <section className="py-20 px-6 bg-blue-50">
            <div className="container mx-auto">
                <div className="grid md:grid-cols-3 gap-8">
                    {stats.map((stat, index) => (
                        <StatsItem key={index} {...stat} />
                    ))}
                </div>
            </div>
        </section>
    );
};


export default StatsSection;