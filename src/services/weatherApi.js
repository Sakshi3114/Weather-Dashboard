import axios from "axios";

const BASE_URL = "https://api.open-meteo.com/v1/forecast";

export const fetchWeather = async (lat, lon) => {
  const res = await axios.get(BASE_URL, {
    params: {
      latitude: lat,
      longitude: lon,
      hourly: [
        "temperature_2m",
        "relativehumidity_2m",
        "precipitation",
        "visibility",
        "windspeed_10m",
      ].join(","),
      daily: [
        "temperature_2m_max",
        "temperature_2m_min",
        "sunrise",
        "sunset",
      ].join(","),
      current_weather: true,
      timezone: "auto",
    },
  });

  return res.data;
};

export const fetchAirQuality = async (lat, lon) => {
    const res = await axios.get(
      "https://air-quality-api.open-meteo.com/v1/air-quality",
      {
        params: {
          latitude: lat,
          longitude: lon,
          hourly: [
            "pm10",
            "pm2_5",
            "carbon_monoxide",
            "nitrogen_dioxide",
            "sulphur_dioxide",
            "ozone",
            "us_aqi"
          ].join(","),
          timezone: "auto",
        },
      }
    );
  
    return res.data;
  };


  export const fetchHistoricalWeather = async (start, end) => {
    const res = await fetch(
      `https://archive-api.open-meteo.com/v1/archive?latitude=31.3&longitude=75.6&start_date=${start}&end_date=${end}&daily=temperature_2m_max,temperature_2m_min,temperature_2m_mean,sunrise,sunset,precipitation_sum,windspeed_10m_max`
    );
  
    const data = await res.json();
  
    return data.daily.time.map((date, i) => ({
      date,
      temp_max: data.daily.temperature_2m_max[i],
      temp_min: data.daily.temperature_2m_min[i],
      temp_mean: data.daily.temperature_2m_mean[i],
      sunrise: new Date(data.daily.sunrise[i]).toLocaleTimeString(),
      sunset: new Date(data.daily.sunset[i]).toLocaleTimeString(),
      precipitation: data.daily.precipitation_sum[i],
      wind_max: data.daily.windspeed_10m_max[i],
    }));
  };