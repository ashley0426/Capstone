import { useState, useEffect } from 'react';

const API_KEY_TIMEZONEDB = "R7KCQ3JYKOTS";
const BASE_URL_TIMEZONEDB = "http://api.timezonedb.com/v2.1/get-time-zone";

/**
 * Fetches current time and timezone information for given latitude and longitude from TimeZoneDB.
 * Uses the free 'by=position' method.
 * @param {number} lat Latitude of the location.
 * @param {number} lng Longitude of the location.
 * @returns {Promise<Object>} An object containing cityName (best guess), cityCurrentDate, cityCurrentTime, and timezone.
 * @throws {Error} If the API call fails or no data is found.
 */
export async function getTimezoneDbTimeByCoords(lat, lng) {
    try {
        // Use 'by=position' for non-premium access
        const response = await fetch(`${BASE_URL_TIMEZONEDB}?key=${API_KEY_TIMEZONEDB}&format=json&by=position&lat=${lat}&lng=${lng}`);

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`);
        }

        const data = await response.json();

        if (data.status === "OK" && data.formatted) {
            const [datePart, timePart] = data.formatted.split(' ');
            const [year, month, day] = datePart.split('-');
            const [hour, minute, second] = timePart.split(':');

            // Create a Date object from the components to correctly format date/time
            const localDateTime = new Date(year, month - 1, day, hour, minute, second);

            const cityTimeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
            const cityDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

            // For 'by=position', TimeZoneDB might not always return a specific 'cityName'.
            // Try to derive a city name from zoneName or use the general region.
            const derivedCityName = data.cityName || data.regionName || data.zoneName.split('/').pop().replace(/_/g, ' ');

            return {
                cityName: derivedCityName,
                cityCurrentDate: localDateTime.toLocaleDateString("en-US", cityDateOptions),
                cityCurrentTime: localDateTime.toLocaleTimeString("en-US", cityTimeOptions),
                timezone: data.zoneName,
                formattedDateTime: data.formatted
            };
        } else {
            throw new Error(data.message || `No time data found for coordinates (${lat}, ${lng}). Please check the location.`);
        }
    } catch (error) {
        console.error("Error fetching time from TimeZoneDB:", error);
        throw error;
    }
}

/**
 * React hook to fetch current time and timezone information from TimeZoneDB using coordinates.
 * @param {number | null} lat Latitude of the location.
 * @param {number | null} lng Longitude of the location.
 * @returns {{ loading: boolean, timeData: Object | null, error: Error | null }}
 */
export function useTimezoneDbTimeByCoords(lat, lng) {
    const [loading, setLoading] = useState(true);
    const [timeData, setTimeData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        setLoading(true);
        setTimeData(null);
        setError(null);

        // Only fetch if both lat and lng are provided (not null)
        if (lat !== null && lng !== null) {
            getTimezoneDbTimeByCoords(lat, lng)
                .then(data => {
                    setTimeData(data);
                })
                .catch(err => {
                    setError(err);
                    console.error("Error in useTimezoneDbTimeByCoords hook:", err);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false); // No coordinates, so not loading
        }
    }, [lat, lng]);

    return {
        loading,
        timeData,
        error
    };
}