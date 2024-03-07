import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [location, setLocation] = useState("");
  const [locationSearched, setLocationSearched] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        if (locationSearched) {
          const response = await axios.get(
            `http://localhost:3000/weather/${locationSearched}`
          );
          setWeatherData(response.data);
          setError("");
        }
      } catch (error) {
        setWeatherData("");
        setForecastData("");
        setError("Error fetching weather data.");
      }
    };
    const fetchForecastData = async () => {
      try {
        if (locationSearched) {
          const responseForecast = await axios.get(
            `http://localhost:3000/forecast/${locationSearched}`
          );
          setForecastData(responseForecast.data.list);
          setError("");
        }
      } catch (error) {
        setWeatherData("");
        setForecastData("");
        setError("Error fetching weather data.");
      }
    };
    fetchWeatherData();
    fetchForecastData();
  }, [locationSearched]);

  const handleClick = () => {
    if (!location.trim()) {
      alert("Enter location");
    } else setLocationSearched(location);
  };

  return (
    <div className="container">
      <div className="search-div">
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location (city)"
        />
        <button onClick={handleClick}>Get Weather</button>
      </div>
      {error && <p className="error-message">{error}</p>}
      {weatherData && (
        <div className="weather-info fadeIn">
          <h2>{weatherData.name}</h2>
          <div className="">
            <p>{weatherData.weather[0].description}</p>
            <p>Temperature: {weatherData.main.temp}°C</p>
          </div>
        </div>
      )}
      {forecastData.length > 0 && (
        <div className="forecast-info">
          <h3>5-Day Forecast</h3>
          <hr />
          {forecastData.slice(0, 5).map((item, index) => (
            <div key={index} className="forecast-item">
              <p>{item.dt_txt}</p>
              <p>{item.weather[0].description}</p>
              <p>Temperature: {item.main.temp}°C</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
