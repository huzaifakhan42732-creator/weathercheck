import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import { fetchWeather } from './services/weatherApi';

function App() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 });

  // Automatically fetch weather on initial mount
  useEffect(() => {
    handleSearch('Lahore');
  }, []);

  // Smooth mouse parallax for background 3D orbs
  const handleMouseMove = (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 30;
    const y = (e.clientY / window.innerHeight - 0.5) * 30;
    setMouseParallax({ x, y });
  };

  const handleSearch = async (city) => {
    if (!city || !city.trim()) return;

    setLoading(true);
    setErrorMessage(null);

    try {
      const data = await fetchWeather(city);
      setWeather(data);
    } catch (err) {
      setErrorMessage(err.message || 'Unable to fetch weather data.');
    } finally {
      setLoading(false);
    }
  };

  const quickCities = ['Lahore', 'London', 'Dubai', 'New York', 'Tokyo'];

  return (
    <div
      onMouseMove={handleMouseMove}
      className="relative min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center justify-start py-8 px-4 sm:px-6 overflow-hidden selection:bg-sky-500 selection:text-white"
    >
      {/* ========================================================
          3D ATMOSPHERIC BACKGROUND EFFECTS
          Floating depth orbs with parallax & animated glow
      ======================================================== */}
      {/* Ambient gradient base */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-slate-900 via-sky-950/60 to-slate-900 z-0" />

      {/* 3D Orb 1: Warm Golden Sun Glow (Top Right) */}
      <div
        style={{
          transform: `translate(${mouseParallax.x * -1.2}px, ${mouseParallax.y * -1.2}px)`,
          transition: 'transform 0.2s ease-out',
        }}
        className="pointer-events-none absolute -top-24 -right-24 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl animate-pulse-glow z-0"
      />

      {/* 3D Orb 2: Deep Sky Cyan Orb (Center Left) */}
      <div
        style={{
          transform: `translate(${mouseParallax.x * 1.5}px, ${mouseParallax.y * 1.5}px)`,
          transition: 'transform 0.2s ease-out',
        }}
        className="pointer-events-none absolute top-1/4 -left-32 w-96 h-96 bg-sky-500/20 rounded-full blur-3xl animate-float-slow z-0"
      />

      {/* 3D Orb 3: Twilight Indigo Glow (Bottom Right) */}
      <div
        style={{
          transform: `translate(${mouseParallax.x * -0.8}px, ${mouseParallax.y * -0.8}px)`,
          transition: 'transform 0.2s ease-out',
        }}
        className="pointer-events-none absolute -bottom-32 right-1/4 w-[28rem] h-[28rem] bg-indigo-600/15 rounded-full blur-3xl animate-float-reverse z-0"
      />

      {/* Subtle Floating 3D Cloud Shapes in Background */}
      <div className="pointer-events-none absolute top-20 left-10 opacity-20 animate-drift z-0">
        <svg className="w-48 h-48 text-sky-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      </div>

      <div className="pointer-events-none absolute bottom-40 right-8 opacity-15 animate-float-reverse z-0">
        <svg className="w-56 h-56 text-indigo-200" fill="currentColor" viewBox="0 0 24 24">
          <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4 9.11 4 6.6 5.64 5.35 8.04 2.34 8.36 0 10.91 0 14c0 3.31 2.69 6 6 6h13c2.76 0 5-2.24 5-5 0-2.64-2.05-4.78-4.65-4.96z" />
        </svg>
      </div>

      {/* ========================================================
          MAIN APP CONTAINER (Foreground)
      ======================================================== */}
      <div className="relative z-10 w-full max-w-xl flex flex-col space-y-5">
        {/* Header */}
        <header className="text-center pt-2 pb-1">
          <div className="inline-flex items-center justify-center space-x-2">
            <span className="text-2xl" role="img" aria-label="Sun and cloud">🌤️</span>
            <h1 className="text-xl sm:text-2xl font-black tracking-wider text-white uppercase drop-shadow-sm">
              Weather App
            </h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-400 mt-1">
            Real-time weather forecast & atmospheric details
          </p>
        </header>

        {/* Search Bar */}
        <div className="space-y-2">
          <SearchBar onSearch={handleSearch} isLoading={loading} />

          {/* Quick city suggestions */}
          <div className="flex items-center gap-1.5 flex-wrap justify-center pt-1 text-xs text-slate-400">
            <span className="font-medium mr-1 text-slate-300">Popular:</span>
            {quickCities.map((city) => (
              <button
                key={city}
                type="button"
                onClick={() => handleSearch(city)}
                disabled={loading}
                className="px-2.5 py-1 bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700/80 rounded-lg text-slate-200 font-medium transition cursor-pointer disabled:opacity-50 hover:border-sky-500/50"
              >
                {city}
              </button>
            ))}
          </div>
        </div>

        {/* Small, friendly error notification */}
        {errorMessage && (
          <div className="bg-rose-950/70 border border-rose-500/50 text-rose-200 px-4 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-between shadow-lg">
            <div className="flex items-center space-x-2">
              <span>⚠️</span>
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="text-rose-400 hover:text-rose-200 text-xs font-semibold ml-2 cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Loading Spinner */}
        {loading && (
          <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-3xl p-8 flex flex-col items-center justify-center shadow-xl">
            <div className="w-9 h-9 border-3 border-sky-400 border-t-transparent rounded-full animate-spin"></div>
            <p className="text-sm font-medium text-slate-300 mt-3">Fetching weather data...</p>
          </div>
        )}

        {/* Main Weather Content */}
        {!loading && weather && (
          <WeatherCard weather={weather} />
        )}

        {/* Footer */}
        <footer className="text-center pt-4 pb-2 text-xs text-slate-400 font-medium tracking-wide">
          Powered by <span className="text-sky-400 font-semibold">Adan Khan</span>
        </footer>
      </div>
    </div>
  );
}

export default App;
