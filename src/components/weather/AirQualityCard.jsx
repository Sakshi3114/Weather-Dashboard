const AirQualityCard = ({ title, value, unit }) => {
    return (
      <div className="bg-gray-50 p-3 rounded-xl text-centerc shadow-md">
        <p className="text-xs text-gray-400">{title}</p>
        <h2 className="text-lg font-semibold">
          {value}
        </h2>
        <p className="text-xs text-gray-400">{unit}</p>
      </div>
    );
  };
  
  export default AirQualityCard;