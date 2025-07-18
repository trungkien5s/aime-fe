const StatsItem = ({ value, label, color }) => {
    return (
        <div className="text-center">
            <div className={`text-4xl font-bold ${color} mb-2`}>{value}</div>
            <div className="text-blue-700">{label}</div>
        </div>
    );
};

export default StatsItem;