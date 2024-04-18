// Import the express, dotenv, and axios libraries
const express = require('express');
const axios = require('axios');
require('dotenv').config();

// Create an instance of express
const app = express();

// Define the port number
const PORT = process.env.PORT || 3000;
//Base URL
const BASE_URL = 'https://api.themoviedb.org/3';
// Bearer token from .env file
const API_KEY = process.env.API_KEY;
// Route to get trending movies
app.get('/trending', async (req, res) => {
    const config = {
        method: 'get',
        url: `${BASE_URL}/trending/all/week?api_key=${API_KEY}&language=en-US`
    };

    try {
        const response = await axios(config);
        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            overview: movie.overview
        }));
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve trending movies", error: error.toString() });
    }
});

// Route to get popular movies
app.get('/popular-movies', async (req, res) => {
    const config = {
        method: 'get',
        url: `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    };

    try {
        const response = await axios(config);
        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            overview: movie.overview,
            popularity: movie.popularity
        }));
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve popular movies", error: error.toString() });
    }
});

// Route to get top-rated movies
app.get('/top-rated-movies', async (req, res) => {
    const config = {
        method: 'get',
        url: `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    };

    try {
        const response = await axios(config);
        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.title,
            release_date: movie.release_date,
            overview: movie.overview,
            rating: movie.vote_average
        }));
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Unable to retrieve top-rated movies", error: error.toString() });
    }
});

// Constructor function for Data Format
function DataFormat(message) {
    this.message = message;
}

// Movie page Endpoint
function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

// Home Page Endpoint
app.get('/favorite', (req, res) => {
    const responseData = new DataFormat('Welcome to Favorite Page');
    res.json(responseData);
});

app.get('/', (req, res) => {
    const responseMovie = new Movie("Spider-Man: No Way Home", `/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg`, "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a superhero. When he asks for help from Doctor Strange, the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.");
    res.json(responseMovie);
});

// Error Handling
app.use((req, res) => {
    res.status(404).json({ status: 404, responseText: "Page not Found" });
});

app.use((err, req, res, next) => {
    res.status(500).json({ status: 500, responseText: "Sorry, something went wrong" });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
