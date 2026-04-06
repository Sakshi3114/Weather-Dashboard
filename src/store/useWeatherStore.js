import { create } from "zustand";

export const useWeatherStore = create((set) => ({
    weather: null,
    airQuality: null,
    unit: "C",
  
    setWeather: (data) => set({ weather: data }),
    setAirQuality: (data) => set({ airQuality: data }),

    toggleUnit: () =>
    set((state) => ({
      unit: state.unit === "C" ? "F" : "C",
    })),
  }));