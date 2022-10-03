"use strict";

const axios = require("axios");

let cache = require('./cache.js');

require('dotenv').config();

class Movie {
  constructor(title) {
    this.title = title;
  }
}

async function handleMovies(req, res) {

  try {
    const { searchQuery } = req.query
    const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&query=${searchQuery}`;
    const key = 'movies-' + searchQuery;

    if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
      console.log('Cache hit');
    } else {
      console.log('Cache miss');
      cache[key] = {};
      cache[key].timestamp = Date.now();
      let movieData = await axios.get(API);
      let movies = movieData.data.results.slice(0,4);
      cache[key].data = movies.map(movieData => new Movie(movieData.title));
    }

    res.send(cache[key].data);
  }


  catch (error) {
    console.log(error);
  }
}


  module.exports = handleMovies;