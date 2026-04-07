import { Card } from "@/components/ui/card";
import { Sun, Moon } from "lucide-react";

const CurrentWeather = ({ weather }) => {
  const current = weather?.current_weather;
  const daily = weather?.daily;

  return (
    <Card className="p-6 flex rounded-2xl">
      
      {/* Left */}
      <div>
        <p className="text-gray-400 text-sm font-medium">
          CURRENT CONDITION
        </p>

        <h1 className="text-5xl font-bold text-blue-900 mt-2">
          {current?.temperature}°C
        </h1>

        <p className="text-gray-600 mt-2">
          Scattered Clouds & Brisk Winds
        </p>

        <p className="text-sm text-gray-400 mt-1">
          Feels like {current?.temperature - 2}°C
        </p>

        {/* Sunrise / Sunset */}
        <div className="flex gap-6 mt-5 text-sm">
          <div className="flex items-center gap-2">
            <Sun size={16} />
            <div>
              <p className="text-gray-400">Sunrise</p>
              <p>
                {new Date(daily?.sunrise[0]).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Moon size={16} />
            <div>
              <p className="text-gray-400">Sunset</p>
              <p>
                {new Date(daily?.sunset[0]).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Cloud Shape */}
      
    </Card>
  );
};

export default CurrentWeather;