import React, { useState } from 'react';

function SearchBar({ onSearch, isLoading }) {
  const [cityInput, setCityInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cityInput.trim()) {
      onSearch(cityInput.trim());
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full flex items-center gap-2">
      <div className="relative flex-1">
        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={cityInput}
          onChange={(e) => setCityInput(e.target.value)}
          placeholder="Search city (e.g. Lahore, London, Tokyo)..."
          disabled={isLoading}
          className="w-full pl-10 pr-4 py-3 text-sm sm:text-base text-white bg-slate-800/80 backdrop-blur-md border border-slate-700/80 rounded-2xl shadow-lg placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-transparent transition disabled:bg-slate-800/40 disabled:cursor-not-allowed"
        />
      </div>
      <button
        type="submit"
        disabled={isLoading || !cityInput.trim()}
        className="px-5 sm:px-6 py-3 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 text-sm sm:text-base font-bold rounded-2xl shadow-lg shadow-sky-500/20 transition duration-200 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap"
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
    </form>
  );
}

export default SearchBar;
