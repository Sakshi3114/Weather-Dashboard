const StatsCard = ({ title, value, unit, icon: Icon }) => {
    return (
      <div className="bg-white p-4 rounded-2xl flex flex-col gap-2 shadow-sm">
        
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">{title}</p>
          {Icon && <Icon size={18} className="text-blue-500" />}
        </div>
  
        <h2 className="text-xl font-semibold">
          {value} {unit}
        </h2>
      </div>
    );
  };
  
  export default StatsCard;