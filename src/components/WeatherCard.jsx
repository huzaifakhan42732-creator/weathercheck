import React, { useState, useRef } from 'react';

// Simple SVG Icons for weather details
const DropletIcon = () => (
  <svg className="w-5 h-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a8 8 0 11-14.856 0c.928-2.678 3.542-5.733 5.428-7.857a2.83 2.83 0 014 0c1.886 2.124 4.5 5.179 5.428 7.857z" />
  </svg>
);

const WindIcon = () => (
  <svg className="w-5 h-5 text-teal-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
  </svg>
);

const CompassIcon = () => (
  <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 2a10 10 0 100 20 10 10 0 000-20zm1 14.5l-1-4.5-4.5-1 10-4-4.5 9.5z" />
  </svg>
);

const GaugeIcon = () => (
  <svg className="w-5 h-5 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
);

const EyeIcon = () => (
  <svg className="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
  </svg>
);

const CloudIcon = () => (
  <svg className="w-5 h-5 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 00-9.78 2.096A4.001 4.001 0 003 15z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

function WeatherDetailCard({ icon, label, value }) {
  if (value == null) return null;

  return (
    <div className="bg-white/95 border border-slate-200/90 rounded-xl p-4 shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-sky-300 flex flex-col items-center text-center group">
      <div className="mb-2 p-2.5 rounded-xl bg-slate-50 border border-slate-100 shadow-inner group-hover:scale-110 transition-transform duration-200">
        {icon}
      </div>
      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{label}</span>
      <span className="text-base sm:text-lg font-bold text-slate-800 mt-1">{value}</span>
    </div>
  );
}

function WeatherCard({ weather }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  if (!weather) return null;

  // 3D Tilt calculation on mouse move
  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 8.5;
    const rotateY = ((x - centerX) / centerX) * 8.5;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  // Dynamic 3D depth shadow based on tilt angle
  const shadowX = -tilt.y * 1.5;
  const shadowY = tilt.x * 1.5 + 20;

  return (
    <div className="w-full space-y-6">
      {/* 1. Main Weather Section with Real 3D Depth, Floating Layers & Specular Reflection */}
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          transform: `perspective(1100px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: 'preserve-3d',
          boxShadow: isHovered
            ? `${shadowX}px ${shadowY}px 40px -10px rgba(14, 116, 144, 0.18), 0 10px 25px -5px rgba(0, 0, 0, 0.05)`
            : '0 20px 35px -10px rgba(15, 23, 42, 0.08), 0 8px 16px -4px rgba(0, 0, 0, 0.04)',
          transition: isHovered ? 'transform 0.1s ease-out, box-shadow 0.2s ease-out' : 'transform 0.5s ease-out, box-shadow 0.5s ease-out',
        }}
        className="relative overflow-hidden bg-white/95 backdrop-blur-sm border border-white/80 rounded-3xl p-6 sm:p-8 text-center select-none"
      >
        {/* Dynamic 3D specular light glare */}
        {isHovered && (
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 35%, transparent 70%)`,
            }}
          />
        )}

        {/* Ambient background weather accent inside card */}
        <div className="pointer-events-none absolute -top-16 -right-16 w-44 h-44 bg-sky-200/40 rounded-full blur-2xl" />
        <div className="pointer-events-none absolute -bottom-16 -left-16 w-44 h-44 bg-indigo-200/30 rounded-full blur-2xl" />

        {/* City & Country (3D Layer at Z: 25px) */}
        <div style={{ transform: 'translateZ(25px)' }} className="relative z-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-800 tracking-tight">
            {weather.cityDisplay || weather.city}
          </h2>

          {/* Date and Time */}
          {weather.dateTime && (
            <p className="text-xs sm:text-sm text-slate-500 mt-1 font-medium">
              {weather.dateTime}
            </p>
          )}
        </div>

        {/* 3D Floating Weather Icon & Temperature Centerpiece (Z: 50px) */}
        <div
          style={{ transform: 'translateZ(50px)', transformStyle: 'preserve-3d' }}
          className="relative z-10 flex flex-col sm:flex-row items-center justify-center my-4 gap-2"
        >
          {weather.icon && (
            <div className="relative">
              {/* Pulsing 3D atmospheric glow halo */}
              <div className="absolute inset-0 bg-sky-400/25 rounded-full blur-xl scale-90 animate-pulse-glow" />
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@4x.png`}
                alt={weather.condition}
                className="relative w-24 h-24 sm:w-32 sm:h-32 -my-3 drop-shadow-xl animate-float-slow"
                loading="lazy"
              />
            </div>
          )}
          <div className="text-6xl sm:text-7xl font-black text-slate-900 tracking-tight drop-shadow-sm">
            {weather.temperature}°<span className="text-4xl sm:text-5xl font-medium text-slate-500">C</span>
          </div>
        </div>

        {/* Condition Description & High/Low (Z: 30px) */}
        <div style={{ transform: 'translateZ(30px)' }} className="relative z-10">
          <p className="text-lg sm:text-xl font-bold text-slate-700">
            {weather.condition}
          </p>

          {/* Feels Like & High / Low badges */}
          <div className="flex items-center justify-center flex-wrap gap-x-4 gap-y-1.5 mt-3 text-sm text-slate-600">
            {weather.feelsLike != null && (
              <span className="bg-slate-100/80 px-2.5 py-0.5 rounded-full">
                Feels like <strong className="font-semibold text-slate-800">{weather.feelsLike}°C</strong>
              </span>
            )}
            {weather.tempHigh != null && (
              <span className="bg-amber-50 text-amber-800 px-2.5 py-0.5 rounded-full border border-amber-100 font-medium">
                High: <strong className="font-bold">{weather.tempHigh}°C</strong>
              </span>
            )}
            {weather.tempLow != null && (
              <span className="bg-blue-50 text-blue-800 px-2.5 py-0.5 rounded-full border border-blue-100 font-medium">
                Low: <strong className="font-bold">{weather.tempLow}°C</strong>
              </span>
            )}
          </div>
        </div>
      </div>

      {/* 2. Weather Details Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2 px-1">
          <h3 className="text-sm font-bold text-slate-700 uppercase tracking-wider">
            Today's Weather Details
          </h3>
          <div className="h-px flex-1 bg-slate-200"></div>
        </div>

        {/* Primary 4-grid for main details */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <WeatherDetailCard icon={<DropletIcon />} label="Humidity" value={weather.humidity} />
          <WeatherDetailCard icon={<WindIcon />} label="Wind Speed" value={weather.windSpeed} />
          <WeatherDetailCard icon={<GaugeIcon />} label="Pressure" value={weather.pressure} />
          <WeatherDetailCard icon={<EyeIcon />} label="Visibility" value={weather.visibility} />
        </div>

        {/* Secondary grid for additional details */}
        <div className="grid grid-cols-2 sm:grid-cols-2 gap-3">
          <WeatherDetailCard icon={<CloudIcon />} label="Cloudiness" value={weather.cloudiness} />
          <WeatherDetailCard icon={<CompassIcon />} label="Wind Direction" value={weather.windDirection} />
          {weather.uvIndex != null && (
            <WeatherDetailCard icon={<SunIcon />} label="UV Index" value={weather.uvIndex} />
          )}
          {weather.dewPoint != null && (
            <WeatherDetailCard icon={<DropletIcon />} label="Dew Point" value={weather.dewPoint} />
          )}
        </div>
      </div>
    </div>
  );
}

export default WeatherCard;
