const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());

app.get("/weather/:location", async (req, res) => {
  try {
    const { location } = req.params;
    const apiUrl = `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.API_KEY}&units=metric`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get("/forecast/:location", async (req, res) => {
  try {
    const { location } = req.params;
    const apiUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;

    const response = await axios.get(apiUrl);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000);
