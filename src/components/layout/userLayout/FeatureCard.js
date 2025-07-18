const FeatureCard = ({ icon: Icon, title, description, iconBg }) => {
    return (
        <div className="bg-white p-6 rounded-xl border border-blue-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group">
            <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-blue-900 mb-2">{title}</h3>
            <p className="text-blue-700">{description}</p>
        </div>
    );
};
export default FeatureCard;