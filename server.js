'use strict';

//SET UP:
require('dotenv').config();
//express server
const express = require('express');
//allows for cross origin resource sharing
const cors = require('cors');
//load data
const handleWeather = require('./modules/weather.js');
const handleMovies = require("./modules/movie.js");
// start up server
const app = express();
//middleware
app.use(cors());
//declare our PORT variable
const PORT = process.env.PORT || 3001;
// listening for connections
app.get("/weather", handleWeather);

app.get("/movies", handleMovies);

app.get("/", (req, res) => {
  res.send('Hello from the Back End, What What!');
});

app.get("*", (request, response) => {
  response.status(400).send("No valid query");
});

//catch all endpoint:
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});

app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));
