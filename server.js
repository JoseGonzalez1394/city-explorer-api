'use strict';

//SET UP:
require('dotenv').config();
//express server
const express = require('express');
//allows for cross origin resource sharing
const cors = require('cors');
//load data
const getWeather = require('./modules/Forecast.js');
const getMovies = require("./modules/Movie.js");
// start up server
const app = express();
const axios = require('axios');
//middleware
app.use(cors());
//declare our PORT variable
const PORT = process.env.PORT || 3001;
// listening for connections
app.get("/weather", getWeather);

app.get("/movies", getMovies);



app.get("*", (request, response) => {
  response.status(400).send("No valid query");
});


app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

//Endpoints:

//sends a response
// app.get('/', (req, res) => {
//   res.send({ weatherData });
// });

// Endpoints:
// class Forecast {
//   constructor(date, high_temp, low_temp, desc) {
//     this.description = `Low of ${low_temp}, high of ${high_temp} with ${desc}`;
//     this.date = date;
//   }
// }

// class Movie {
//   constructor(title) {
//     this.title = title;
//   }
// }

app.get("/", (req, res) => {
  res.send('Hello from the Back End, What What!');
});

// app.get('/weather', async (req, res) => {

//   try {
//     const { lat, lon } = req.query
//     const API = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${process.env.REACT_APP_WEATHER_BIT_KEY}`;
//     const response = await axios.get(API);
// console.log(response.data.data); 
//     res.send(response.data.data.map(forecastData => new Forecast(forecastData.datetime, forecastData.temp, forecastData.temp, forecastData.weather.description)))
//   }

//   catch (error) {
//     console.log(error);
//   }
// });

// app.get('/movies', async (req, res) => {

//   try {
//     const { searchQuery} = req.query
//     const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&query=${searchQuery}`;
//     console.log(API);
//     const movieResponse = await axios.get(API);
//     const movies = movieResponse.data.results.slice(0,4);
//     res.send(movies.map(movieData => new Movie(movieData.title)));
//   }

//   catch (error) {
//     console.log(error);
//   }
// });

//catch all endpoint:
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});
