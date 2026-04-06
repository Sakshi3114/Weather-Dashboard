import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";
import { fetchHistoricalWeather } from "../services/weatherApi";
import HistoricalChart from "../components/historical/HistoricalChart";

const Historical = () => {
  const [data, setData] = useState(null);
  const [range, setRange] = useState({
    start: "2024-04-01",
    end: "2025-04-01",
  });

  useEffect(() => {
    fetchHistoricalWeather(range.start, range.end).then(setData);
  }, [range]);

  if (!data) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Fetching weather data...</p>
      </div>
    );
  }

  const handleDateChange = (start, end) => {
    const diff =
      (new Date(end) - new Date(start)) / (1000 * 60 * 60 * 24);
  
    if (diff > 730) {
      alert("Maximum range is 2 years");
      return;
    }
  
    setRange({ start, end });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      
      <Sidebar />

      <div className="flex-1 p-6">
        <Header />

        {/* Date Range Picker */}
        <div className="bg-white p-4 rounded-xl mb-6 flex gap-4 items-center">
          <input
            type="date"
            value={range.start}
            onChange={(e) =>
              setRange({ ...range, start: e.target.value })
            }
          />

          <input
            type="date"
            value={range.end}
            onChange={(e) =>
              setRange({ ...range, end: e.target.value })
            }
          />
        </div>

        {/* Charts */}
        <div className="space-y-6 max-h-[80vh] overflow-y-auto max-w-[80vw] overflow-x-auto">

          <HistoricalChart
            title="Temperature (Min / Max / Mean)"
            data={data}
            lines={["temp_max", "temp_min", "temp_mean"]}
          />

          <HistoricalChart
            title="Sun Cycle (IST)"
            data={data}
            lines={["sunrise", "sunset"]}
          />

          <HistoricalChart
            title="Precipitation"
            data={data}
            lines={["precipitation"]}
          />

          <HistoricalChart
            title="Wind Speed"
            data={data}
            lines={["wind_max"]}
          />

          <HistoricalChart
            title="Air Quality (PM10 & PM2.5)"
            data={data}
            lines={["pm10", "pm25"]}
          />

        </div>
      </div>
    </div>
  );
};

export default Historical;