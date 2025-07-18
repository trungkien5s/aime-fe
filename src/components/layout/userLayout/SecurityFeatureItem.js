const SecurityFeatureItem = ({ title, description }) => {
    return (
        <div className="flex items-start space-x-3">
            <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                <span className="text-white text-sm">✓</span>
            </div>
            <div>
                <h4 className="text-blue-900 font-semibold">{title}</h4>
                <p className="text-blue-700">{description}</p>
            </div>
        </div>
    );
};
export default SecurityFeatureItem;