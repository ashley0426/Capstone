import { useState, useEffect } from 'react';

// Your Visual Crossing API Key
const API_KEY = "ZWFHUFBLFHBSZSMXUWX3RHTMB"; // Ensure this is your correct Visual Crossing API Key
const BASE_URL = "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

export async function getVisualCrossingCurrentWeatherByQuery(q) {
    try {
        // --- CHANGE HERE: unitGroup=us to unitGroup=metric ---
        const response = await fetch(`${BASE_URL}/${q}?unitGroup=metric&key=${API_KEY}&contentType=json`);

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`HTTP error! Status: ${response.status}, Message: ${errorText || 'Unknown error from Visual Crossing API'}`);
        }

        const data = await response.json();

        if (data && data.currentConditions) {
            const current = data.currentConditions;
            const timezone = data.timezone;
            const cityDateTime = new Date(current.datetimeEpoch * 1000);

            const cityTimeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true, timeZone: timezone };
            const cityDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', timeZone: timezone };

            return {
                cityName: data.address,
                countryCode: data.countryCode, // Visual Crossing provides this
                stateCode: data.stateCode,     // Visual Crossing provides this
                temp: current.temp,
                feelsLike: current.feelslike,
                windSpeed: current.windspeed,
                windDirection: current.winddir,
                precipitation: current.precip, // Will be in mm or cm depending on precise API setting
                humidity: current.humidity,
                pressure: current.pressure, // Will be in hPa (millibars)
                visibility: current.vis, // Will be in km
                uvIndex: current.uvindex,
                weatherDescription: current.conditions,
                weatherIcon: current.icon,
                cityCurrentTime: cityDateTime.toLocaleTimeString("en-US", cityTimeOptions),
                cityCurrentDate: cityDateTime.toLocaleDateString("en-US", cityDateOptions),
                timezone: timezone,
                lastUpdated: new Date(current.datetimeEpoch * 1000).toLocaleString("en-AU", { timeZoneName: "short" }),
                latitude: data.latitude, // ADDED: Visual Crossing directly gives latitude
                longitude: data.longitude // ADDED: Visual Crossing directly gives longitude
            };
        } else {
            throw new Error(`No current weather data found for "${q}". Please check the city name.`);
        }
    } catch (error) {
        console.error("Error fetching current weather from Visual Crossing:", error);
        throw error;
    }
}

export function useVisualCrossingWeather(search) {
    const [loading, setLoading] = useState(true);
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setWeatherData(null);
        setError(null);

        if (search) {
            getVisualCrossingCurrentWeatherByQuery(search)
                .then(data => {
                    setWeatherData(data);
                })
                .catch(err => {
                    setError(err);
                    console.error("Error in useVisualCrossingWeather hook:", err);
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

export function checkVisualCrossingTime(search) {
    return getVisualCrossingCurrentWeatherByQuery(search);
}