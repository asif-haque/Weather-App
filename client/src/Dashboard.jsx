import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [location, setLocation] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState([]);
  const [error, setError] = useState("");

  // fetching on click
  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3000/weather/${location}`
      );
      setWeatherData(response.data);
      const responseForecast = await axios.get(
        `http://localhost:3000/forecast/${location}`
      );
      setForecastData(responseForecast.data.list);
      console.log(responseForecast.data);
      setError("");
    } catch (error) {
      setWeatherData("");
      setForecastData("");
      setError("Error fetching weather data.");
    }
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
        <button onClick={fetchWeatherData}>Get Weather</button>
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
