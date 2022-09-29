'use strict';

//SET UP:
require('dotenv').config();
//express server
const express = require('express');
//allows for cross origin resource sharing
const cors = require('cors');
//load data
const weatherData = require('./data/weather.json');
const res = require('express/lib/response');
// start up server
const app = express();
//middleware
app.use(cors());
//declare our PORT variable
const PORT = process.env.PORT || 3001;
// listening for connections
app.listen(PORT, () => console.log(`Listening on PORT ${PORT}`));

//Endpoints:

//sends a response
app.get('/', (req, res) => {
  res.send({ weatherData });
});

class Forecast {
  constructor(date, description) {
    this.date = date;
    this.description = description;
  }
}
app.get('/weather', (req, res) => {
  console.log(req);
  let weatherArr = [];
  // const userQuery = req.query.searchQuery;
  // const userLat = req.query.lat;
  // const userLon = req.query.lon;
  // const weatherCity = weatherData.find(element => element.city_name === userQuery || element.lat === userLat || element.lon === userLon);
  // if (weatherCity){
  //  let date = userWeather.data.valid_date
  //  let description = user
  // }

  weatherData.forEach(city => {

    city.data.forEach(day => {

      let dayForecast = new Forecast(day.valid_date, day.weather.description);
      weatherArr.push(dayForecast);

    });

  });

  res.status(200);
  res.send(weatherArr);

});

app.get('/forecast', (req, res) => {
  res.send({ Forecast });
});
//catch all endpoint:
app.get('*', (req, res) => {
  res.status(404).send('Page Not Found');
});
