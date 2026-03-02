import { useState, useEffect } from 'react';

const API_KEY = "8cb788c6331444ef90795750252605"; // Ensure you have this in your .env
const BASE_URL = "http://api.weatherapi.com/v1";

export async function getWeatherApiCurrentWeatherByQuery(q) {
    try {
        const response = await fetch(`${BASE_URL}/current.json?key=${API_KEY}&q=${q}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error.message || 'Unknown error'}`);
        }

        const data = await response.json();

        if (data && data.current && data.location) {
            const current = data.current;
            const location = data.location;
            const timezone = location.tz_id; // Timezone from WeatherAPI.com

            // Convert local time string to Date object
            const localDateTime = new Date(location.localtime);

            const cityTimeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone };
            const cityDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

            return {
                cityName: location.name,
                countryCode: location.country,
                stateCode: location.region,
                temp: current.temp_c,
                feelsLike: current.feelslike_c,
                windSpeed: current.wind_kph,
                windDirection: current.wind_dir,
                precipitation: current.precip_mm, // mm
                humidity: current.humidity,
                pressure: current.pressure_mb, // mb
                visibility: current.vis_km, // km
                uvIndex: current.uv,
                weatherDescription: current.condition.text,
                weatherIcon: current.condition.icon.replace('//cdn.weatherapi.com/', ''), // Relative path for local image or full URL if hosted
                cityCurrentTime: localDateTime.toLocaleTimeString("en-US", cityTimeOptions),
                cityCurrentDate: localDateTime.toLocaleDateString("en-US", cityDateOptions),
                timezone: timezone,
                lastUpdated: new Date(current.last_updated_epoch * 1000).toLocaleString("en-AU", { timeZoneName: "short" }),
                latitude: location.lat, // ADDED: WeatherAPI.com provides latitude
                longitude: location.lon // ADDED: WeatherAPI.com provides longitude
            };
        } else {
            throw new Error("No current weather data found for the given query.");
        }
    } catch (error) {
        console.error("Error fetching current weather from WeatherAPI.com:", error);
        throw error;
    }
}

export function useWeatherApiCurrentWeather(search) { // Renamed for clarity
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setWeatherData(null);
        setError(null);

        if (search) {
            getWeatherApiCurrentWeatherByQuery(search)
                .then(data => {
                    setWeatherData(data);
                })
                .catch(err => {
                    setError(err);
                    console.error("Error in useWeatherApiCurrentWeather hook:", err);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [search]);

    return {
        loading,
        weatherData,
        error
    };
}

export function checkWeatherApiTime(search) {
    return getWeatherApiCurrentWeatherByQuery(search);
}