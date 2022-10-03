'use strict'; 

const axios = require('axios'); 

const cacheClass = require("./cache.js");

const cache = new cacheClass();

require('dotenv').config();

class Forecast {
	constructor(date, high_temp, low_temp, desc) {
		this.description = `Low of ${low_temp}, high of ${high_temp} with ${desc}`;
		this.date = date;
	}
}

async function handleWeather(req,res){
	try {
		const { lat, lon } = req.query
		const API = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.REACT_APP_WEATHER_BIT_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`; 
		const response = await axios.get(API);
		res.send(response.data.data.map(forecastData => new Forecast(forecastData.datetime, forecastData.temp, forecastData.temp, forecastData.weather.description)))
	  }
	
	  catch (error) {
		console.log(error);
	  }
}

module.exports = handleWeather;