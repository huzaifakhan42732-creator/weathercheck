// OpenWeatherMap API service
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

/**
 * Converts wind degrees into cardinal direction (e.g., 315 -> 'NW')
 */
function getWindDirection(deg) {
  if (deg == null) return null;
  const directions = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];
  const index = Math.round(deg / 22.5) % 16;
  return directions[index];
}

/**
 * Converts ISO-2 country code to full country name (e.g., 'PK' -> 'Pakistan')
 */
function getCountryName(countryCode) {
  if (!countryCode) return '';
  try {
    const regionNames = new Intl.DisplayNames(['en'], { type: 'region' });
    return regionNames.of(countryCode) || countryCode;
  } catch {
    return countryCode;
  }
}

/**
 * Formats local date and time using the city's timezone offset
 */
function formatLocalDateTime(timezoneOffsetSeconds) {
  const now = new Date();
  if (timezoneOffsetSeconds == null) {
    return now.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    });
  }
  const utcMs = now.getTime() + now.getTimezoneOffset() * 60000;
  const cityDate = new Date(utcMs + timezoneOffsetSeconds * 1000);
  const dateStr = cityDate.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  });
  const timeStr = cityDate.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  });
  return `${dateStr} • ${timeStr}`;
}

/**
 * Capitalizes every word in a string (e.g., 'broken clouds' -> 'Broken Clouds')
 */
function capitalizeWords(str) {
  if (!str) return '';
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

/**
 * Fetch current weather data for a city
 * @param {string} city - The name of the city to search
 * @returns {Promise<Object>} Cleanly mapped weather data
 */
export async function fetchWeather(city) {
  // Read API key solely from environment variable
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  if (!apiKey) {
    throw new Error('Unable to fetch weather data. API key is missing.');
  }

  const trimmedCity = city.trim();
  if (!trimmedCity) {
    throw new Error('Please enter a city name.');
  }

  const url = `${BASE_URL}?q=${encodeURIComponent(trimmedCity)}&units=metric&appid=${apiKey}`;

  let response;
  try {
    response = await fetch(url);
  } catch {
    throw new Error('Unable to fetch weather data. Please check your connection.');
  }

  if (!response.ok) {
    if (response.status === 404) {
      throw new Error(`City "${trimmedCity}" not found.`);
    }
    throw new Error('Unable to fetch weather data.');
  }

  const data = await response.json();

  const countryName = getCountryName(data.sys?.country);
  const cityDisplay = countryName ? `${data.name}, ${countryName}` : data.name;

  return {
    city: data.name,
    country: countryName,
    cityDisplay,
    dateTime: formatLocalDateTime(data.timezone),
    temperature: Math.round(data.main?.temp),
    feelsLike: Math.round(data.main?.feels_like),
    tempHigh: data.main?.temp_max != null ? Math.round(data.main.temp_max) : null,
    tempLow: data.main?.temp_min != null ? Math.round(data.main.temp_min) : null,
    condition: capitalizeWords(data.weather?.[0]?.description || data.weather?.[0]?.main || 'Clear'),
    icon: data.weather?.[0]?.icon || null,
    humidity: data.main?.humidity != null ? `${data.main.humidity}%` : null,
    windSpeed: data.wind?.speed != null ? `${Math.round(data.wind.speed * 3.6)} km/h` : null,
    windDirection: getWindDirection(data.wind?.deg),
    pressure: data.main?.pressure != null ? `${data.main.pressure} hPa` : null,
    visibility: data.visibility != null ? `${Math.round(data.visibility / 1000)} km` : null,
    cloudiness: data.clouds?.all != null ? `${data.clouds.all}%` : null,
    uvIndex: data.uvi != null ? data.uvi : null,
    dewPoint: data.main?.dew_point != null ? `${Math.round(data.main.dew_point)}°C` : null,
  };
}
