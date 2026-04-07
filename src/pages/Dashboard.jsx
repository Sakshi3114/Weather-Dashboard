import { useState, useEffect } from "react";
import { useGeolocation } from "../hooks/useGeolocation";
import { fetchWeather, fetchAirQuality } from "../services/weatherApi";
import { useWeatherStore } from "../store/useWeatherStore";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import CurrentWeather from "../components/weather/CurrentWeather";
import StatsCard from "../components/weather/StatsCard";
import ForecastChart from "@/components/weather/ForecastChart";
import AirQualityCard from "@/components/weather/AirQualityCard";
import { convertTemp } from "@/utils/formatters";
import SimpleLineChart from "@/components/charts/SimpleLineChart";
import HumidityBarChart from "@/components/charts/HumidityBarChart";
import AirPollutionChart from "@/components/charts/AirPollutionChart";
import ScrollableLineChart from "@/components/charts/SimpleLineChart";


const Dashboard = () => {
  const { location } = useGeolocation();
  const { weather, setWeather, airQuality, setAirQuality, unit, toggleUnit } = useWeatherStore();
  const [isOpen, setIsOpen] = useState(false);

  const chartData = weather?.hourly?.time.map((time, i) => ({
    time: new Date(time).getHours() + ":00",
    temperature: convertTemp(weather.hourly.temperature_2m[i], unit),
    humidity: weather.hourly.relativehumidity_2m[i],
    precipitation: weather.hourly.precipitation[i],
    visibility: weather.hourly.visibility[i] / 1000, // km
    wind: weather.hourly.windspeed_10m[i],
  }));
  
  const pollutionData = airQuality?.hourly.time.map((time, i) => ({
    time: new Date(time).getHours() + ":00",
    pm10: airQuality.hourly.pm10[i],
    pm25: airQuality.hourly.pm2_5[i],
  }));

  useEffect(() => {
    if (!location) return;
  
    const loadData = async () => {
      try {
        const weatherRes = await fetchWeather(location.lat, location.lon);
        setWeather(weatherRes || {}); 
      } catch (err) {
        console.error("Weather API failed:", err);
        setWeather({}); 
      }
  
      try {
        const airRes = await fetchAirQuality(location.lat, location.lon);
        setAirQuality(airRes || {});
      } catch (err) {
        console.error("Air Quality API failed:", err);
        setAirQuality({}); 
      }
    };
  
    loadData();
  }, [location]);

  const currentAQ = airQuality?.hourly;

  console.log("Air quality", airQuality);

  const currentTime = weather?.current_weather?.time;

// Convert to hour format: 2026-04-06T18:00
const formattedTime = currentTime?.slice(0, 13) + ":00";

const index = airQuality?.hourly?.time.findIndex(
  (t) => t === formattedTime
);

console.log("Index",index);

  if (!weather) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Fetching weather data...</p>
      </div>
    );
  }

  const hourlyData = weather?.hourly?.time.map((time, index) => ({
    time: new Date(time).getHours() + ":00",
    temperature: weather.hourly.temperature_2m[index],
    humidity: weather.hourly.relativehumidity_2m[index],
  }));

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      {/* Sidebar */}
      <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />

      {/* Main */}
      <div className="flex-1 min-w-0 p-4 md:p-6 overflow-hidden">
        
        <Header setIsOpen={setIsOpen}/>

        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          
          {/* Current Weather */}
          <div className="col-span-2">
          <CurrentWeather weather={weather} />
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-4">
            <StatsCard
                title="Precipitation"
                value={weather?.hourly?.precipitation[0]}
                unit="%"
            />
            <StatsCard
                title="Humidity"
                value={weather?.hourly?.relativehumidity_2m[0]}
                unit="%"
            />
            <StatsCard
                title="Wind Speed"
                value={weather?.current_weather?.windspeed}
                unit="km/h"
            />
            <StatsCard
                title="Min/Max"
                value={`${weather?.daily?.temperature_2m_min[0]}° / ${weather?.daily?.temperature_2m_max[0]}°`}
            />
          </div>

        </div>

        {/* Air Quality Section */}


<div className="mt-6 bg-white p-6 rounded-2xl">
  
  <div className="flex justify-between mb-4">
    <h2 className="font-semibold">
      Environmental Air Quality
    </h2>

    <span className="text-green-500 text-sm font-medium">
      GOOD • AQI {currentAQ?.us_aqi[index]}
    </span>
  </div>

  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
    <AirQualityCard title="AQI" value={currentAQ?.us_aqi[index]} />
    <AirQualityCard title="PM10" value={currentAQ?.pm10[index]} unit="µg/m³" />
    <AirQualityCard title="PM2.5" value={currentAQ?.pm2_5[index]} unit="µg/m³" />
    <AirQualityCard title="CO" value={currentAQ?.carbon_monoxide[index]} unit="µg/m³" />
    <AirQualityCard title="NO2" value={currentAQ?.nitrogen_dioxide[index]} unit="µg/m³" />
    <AirQualityCard title="SO2" value={currentAQ?.sulphur_dioxide[index]} unit="µg/m³" />
  </div>
</div>

        {/* Charts Section Placeholder */}
        <div className="mt-6 bg-white p-4 md:p-6 rounded-xl max-h-[80vh] overflow-y-auto overflow-x-hidden">
  
  <div className="flex justify-between items-center mb-6">
    <h2 className="font-semibold">
      24-Hour Forecast Analysis
    </h2>

    <button
      onClick={toggleUnit}
      className="px-4 py-1 bg-blue-100 text-blue-900 rounded-lg text-sm cursor-pointer"
    >
      Switch to {unit === "C" ? "°F" : "°C"}
    </button>
  </div>

  <div className="space-y-10 min-h-0 "> 

    {/* Temperature */}
    <div className="h-87.5">  {/* Fixed height per chart row */}
      <p className="text-sm text-gray-500 mb-3">Temperature</p>
      <ScrollableLineChart data={chartData} dataKey="temperature" />
    </div>


    {/* Humidity */}
    <div>
      <p className="text-sm text-gray-500 mb-3">Relative Humidity (%)</p>
      <HumidityBarChart data={chartData} />
    </div>

    {/* Wind */}
    <div>
      <p className="text-sm text-gray-500 mb-3">Wind Speed (10m)</p>
      <ScrollableLineChart data={chartData} dataKey="wind" color="#10b981" />
    </div>

    {/* Precipitation */}
    <div>
      <p className="text-sm text-gray-500 mb-3">Precipitation</p>
      <ScrollableLineChart data={chartData} dataKey="precipitation" color="#6366f1" />
    </div>

    {/* Visibility */}
    <div>
      <p className="text-sm text-gray-500 mb-3">Visibility (km)</p>
      <ScrollableLineChart data={chartData} dataKey="visibility" color="#f59e0b" />
    </div>

    {/* Air Pollution */}
    <div>
      <p className="text-sm text-gray-500 mb-3">PM10 & PM2.5</p>
      <AirPollutionChart data={pollutionData} />
    </div>

  </div>
</div>

      </div>
    </div>
  );
};

export default Dashboard;