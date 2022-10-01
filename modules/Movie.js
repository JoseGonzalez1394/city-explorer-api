"use strict";

const axios = require("axios");

const cacheClass = require("./cache.js");

const cache = new cacheClass();


const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}`;

class Movie {
    constructor(title) {
      this.title = title;
    }
  }

app.get('/movies', async (req, res) => {

    try {
      const { searchQuery} = req.query
      const API = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_MOVIE_DB_KEY}&query=${searchQuery}`;
      console.log(API);
      const movieResponse = await axios.get(API);
      const movies = movieResponse.data.results.slice(0,4);
      res.send(movies.map(movieData => new Movie(movieData.title)));
    }
  
    catch (error) {
      console.log(error);
    }
  });
  

module.exports = getMovies;