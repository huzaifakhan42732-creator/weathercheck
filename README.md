# Simple Weather App (React.js + Tailwind CSS)

A clean, modern, and realistic Weather Application built with **React.js** and **Tailwind CSS**. Designed for simplicity, responsive performance, and clear student project architecture.

---

## 🌟 Features

- **City Search**: Search for any city worldwide (e.g. Lahore, London, Dubai, New York, Tokyo) without page reloads.
- **Main Weather Display**:
  - City name & Full country name (e.g. *Lahore, Pakistan*)
  - Formatted local date & time for the searched city
  - Prominent, large current temperature in Celsius (°C)
  - Weather condition description with high-resolution weather icon
  - "Feels like" temperature
  - Today's High and Low temperatures
- **Detailed Weather Cards**:
  - **Humidity** (%)
  - **Wind Speed** (km/h)
  - **Wind Direction** (16-point cardinal compass e.g., *NW, SE*)
  - **Atmospheric Pressure** (hPa)
  - **Visibility** (km)
  - **Cloudiness** (%)
  - **UV Index & Dew Point** (conditionally rendered if supported by API)
- **Graceful Error & Loading States**:
  - Clean animated spinner during data fetching.
  - Small, friendly error alerts (e.g., *"City not found"*, *"Unable to fetch weather data."*) without raw error stacks or breaking the UI.
  - Previous weather information remains intact if a subsequent search fails.
- **Mobile-First Responsive Layout**: Smooth scaling across mobile phones, tablets, and desktops using Tailwind CSS.

---

## 🛠️ Tech Stack

- **Frontend**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v3](https://tailwindcss.com/)
- **Bundler & Dev Server**: [Vite 5](https://vitejs.dev/)
- **Weather API**: [OpenWeatherMap API](https://openweathermap.org/api)

---

## 📁 Project Structure

```text
weather/
├── src/
│   ├── components/
│   │   ├── SearchBar.jsx      # Clean search input with quick buttons
│   │   └── WeatherCard.jsx    # Main temperature, conditions & detail cards
│   ├── services/
│   │   └── weatherApi.js      # OpenWeatherMap fetch logic & field mapping
│   ├── App.jsx                # App layout, state management & error handling
│   ├── main.jsx               # React DOM entry point
│   └── index.css              # Tailwind base & utilities
├── .env                       # API key configuration
├── .env.example               # Template for environment variables
├── .gitignore                 # Ignores sensitive keys & node_modules
├── index.html                 # Main HTML template
├── vite.config.js             # Vite configuration
├── tailwind.config.js         # Tailwind configuration
├── postcss.config.js          # PostCSS configuration
├── package.json               # Dependencies and scripts
└── README.md                  # Documentation & usage guide
```

---

## 🚀 Getting Started

### 1. Configure the Weather API Key
Open [`.env`](file:///.env) in the project root and replace `YOUR_API_KEY` with your free [OpenWeatherMap API Key](https://openweathermap.org/api):

```env
VITE_WEATHER_API_KEY=your_actual_api_key_here
```

### 2. Run the Development Server

```bash
npm run dev
```

Open your browser at `http://localhost:5173`.

### 3. Build for Production

```bash
npm run build
```

---

## 📄 License
This project is open-source and created for educational and student project use.
