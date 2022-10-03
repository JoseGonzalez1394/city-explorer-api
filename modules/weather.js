'use strict';

const axios = require('axios');

let cache = require('./cache.js');

require('dotenv').config();

class Forecast {
	constructor(date, high_temp, low_temp, desc) {
		this.description = `Low of ${low_temp}, high of ${high_temp} with ${desc}`;
		this.date = date;
	}
}

async function handleWeather(req, res) {
	try {
		const { lat, lon } = req.query
		const API = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.REACT_APP_WEATHER_BIT_KEY}&land=en&lat=${lat}&lon=${lon}&days=5`;
		const key = 'weather-' + lat + lon;
	
		if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
			console.log('Cache hit');
		} else {
			console.log('Cache miss');
			cache[key] = {};
			cache[key].timestamp = Date.now();
			let weatherData = await axios.get(API);
			cache[key].data = weatherData.data.data.map(forecastData => new Forecast(forecastData.datetime, forecastData.temp, forecastData.temp, forecastData.weather.description))
		}

		res.send(cache[key].data);
	}

	catch (error) {
		console.log(error);
	}
}


module.exports = handleWeather;