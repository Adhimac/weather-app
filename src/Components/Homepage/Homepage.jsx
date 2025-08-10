import React, { useEffect, useState } from "react";
import axios from "axios";
import image from "../../assets/Images/image-2.png";
import { WiHumidity } from "react-icons/wi";
import { FaWind } from "react-icons/fa";

const Homepage = () => {
  // State variables for weather data
  const [temp, setTemp] = useState(); // Temperature in °C
  const [city, setCity] = useState("Kerala"); // Default city
  const [showCity, setShowCity] = useState(""); // City name to display
  const [loading, setLoading] = useState(false); // Loading indicator
  const [wind, setWind] = useState(); // Wind speed in km/h
  const [humidity, setHumidity] = useState(); // Humidity in %

  /**
   * Fetch weather data from OpenWeather API
   * @param {Event} e - Optional form submit event
   */
  const fetchData = async (e) => {
    if (e) e.preventDefault(); // Prevent page reload on form submit
    setLoading(true); // Show loading state

    try {
      // API request
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${
          import.meta.env.VITE_WEATHER
        }`
      );

      // Update state with rounded values
      setTemp(Math.floor(data.main.temp)); // Temperature
      setWind(Math.floor(data.wind.speed)); // Wind speed in m/s (API default)
      setHumidity(data.main.humidity); // Humidity in %
      setShowCity(city); // Update displayed city
    } catch (error) {
      console.error(error);
      alert("City not found!");
    } finally {
      setLoading(false); // Hide loading state
    }
  };

  // Run fetchData once on component mount (default city: Kerala)
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen bg-gradient-to-b from-[#3ad8de] to-transparent p-4">
      
      {/* Search Form */}
      <form
        onSubmit={fetchData}
        className="flex flex-col items-center mb-4 gap-2"
      >
        <input
          type="text"
          placeholder="Enter city name..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-1/3 px-4 py-2 text-center bg-amber-50 text-gray-800 placeholder-gray-400 border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-500 transition-all"
        />
        <button
          type="submit"
          className= "bg-amber-50 text-black px-5 py-2 rounded-lg shadow-md"
        >
          Search
        </button>
      </form>

      {/* Weather Illustration & Temperature */}
      <div className="flex flex-col items-center mt-10 text-gray-800 font-serif">
        <img src={image} className="w-80" alt="Weather illustration" />
        
        {loading ? (
          <p>Loading...</p>
        ) : (
          temp !== undefined && (
            <h1 className="flex items-center gap-3 text-4xl font-semibold drop-shadow-lg">
              {temp}°C <span className="text-lg font-normal">({showCity})</span>
            </h1>
          )
        )}
      </div>

      {/* Additional Weather Info */}
      <div className="flex flex-col items-center mt-6 gap-4">
        
        {/* Wind Speed */}
        {wind !== undefined && (
          <div className="flex items-center gap-3 text-2xl font-semibold drop-shadow-lg">
            {wind} km/h
            <FaWind className="text-blue-600 text-4xl animate-pulse" />
          </div>
        )}

        {/* Humidity */}
        {humidity !== undefined && (
          <div className="flex items-center gap-3 text-4xl font-semibold drop-shadow-lg">
            {humidity}%
            <WiHumidity className="text-blue-600 text-5xl animate-pulse" />
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
