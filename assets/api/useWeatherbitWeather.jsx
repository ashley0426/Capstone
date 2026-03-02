import { useState, useEffect } from 'react';

// Your Weatherbit.io API Key
const API_KEY_WEATHERBIT = "5ed46f32566a49bf9eed050580b492b2"; // <-- REPLACE WITH YOUR ACTUAL WEATHERBIT.IO API KEY
const BASE_URL_WEATHERBIT = "https://api.weatherbit.io/v2.0";

export async function getWeatherbitCurrentWeatherByQuery(q) {
    try {
        // Construct the API URL using the city name and metric units
        const response = await fetch(`${BASE_URL_WEATHERBIT}/current?city=${q}&key=${API_KEY_WEATHERBIT}&units=M`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText || 'Unknown error from Weatherbit.io API'}`);
        }

        const data = await response.json();

        // Weatherbit.io returns data in a 'data' array
        if (data && data.data && data.data.length > 0) {
            const current = data.data[0];
            const timezone = current.timezone; // Get timezone from the response
            const cityDateTime = new Date(current.ts * 1000); // Convert Unix timestamp to milliseconds

            const cityTimeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone };
            const cityDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

            return {
                cityName: current.city_name,
                countryCode: current.country_code,
                stateCode: current.state_code,
                temp: current.temp, // Celsius (units=M)
                feelsLike: current.app_temp, // Celsius (units=M)
                // Convert wind speed from m/s to km/h (1 m/s = 3.6 km/h)
                windSpeed: (current.wind_spd * 3.6).toFixed(1), // Round to 1 decimal place
                windDirection: current.wind_dir, // Degrees
                precipitation: current.precip, // mm/hr (units=M)
                humidity: current.rh, // %
                pressure: current.pres, // mb
                visibility: current.vis, // KM (units=M)
                uvIndex: current.uv,
                weatherDescription: current.weather.description,
                // Construct icon URL (Weatherbit.io uses its own icon host)
                weatherIcon: current.weather.icon, // Just the icon code, prepend host later if needed, or handle in WeatherDisplay
                cityCurrentTime: cityDateTime.toLocaleTimeString("en-US", cityTimeOptions),
                cityCurrentDate: cityDateTime.toLocaleDateString("en-US", cityDateOptions),
                timezone: timezone,
                lastUpdated: new Date(current.ts * 1000).toLocaleString("en-AU", { timeZoneName: "short" }),
                latitude: current.lat, // ADDED: Weatherbit.io provides latitude
                longitude: current.lon // ADDED: Weatherbit.io provides longitude
            };
        } else {
            throw new Error(`No current weather data found for "${q}". Please check the city name.`);
        }
    } catch (error) {
        console.error("Error fetching current weather from Weatherbit.io:", error);
        throw error;
    }
}

export function useWeatherbitWeather(search) {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setWeatherData(null);
        setError(null);

        if (search) {
            getWeatherbitCurrentWeatherByQuery(search)
                .then(data => {
                    setWeatherData(data);
                })
                .catch(err => {
                    setError(err);
                    console.error("Error in useWeatherbitWeather hook:", err);
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

export function checkWeatherbitTime(search) {
    // This function can reuse the current weather query to get time
    return getWeatherbitCurrentWeatherByQuery(search);
}