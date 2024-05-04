// Import the express, dotenv, and axios libraries
const express = require('express');
const axios = require('axios');
require('dotenv').config();
const bodyParser = require('body-parser');
// Create an instance of express
const app = express();

//bodyParser json part
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const DataBase = process.env.PG_DATABASE;
const UserName = process.env.PG_USER;
const password = process.env.PG_PASSWORD;
const Host = process.env.PG_HOST;
const Port = process.env.PG_PORT;
const { Client } = require('pg');
const url = `postgres://${UserName}:${password}@${Host}:${Port}/${DataBase}`;
const client = new Client(url);



// Define the port number
const PORT = process.env.PORT || 3000;
//Base URL
const BASE_URL = 'https://api.themoviedb.org/3';
// Bearer token from .env file
const API_KEY = process.env.API_KEY;

// Route Add Movie to Database
app.post('/addMovie', async (req, res) => {
    const { title, overview, release_date, poster_path, comment } = req.body;
    const sql = `INSERT INTO movie (title, overview, release_date, poster_path, comment) VALUES($1, $2, $3, $4, $5);`;
    const values = [title, overview, release_date, poster_path, comment];
    client.query(sql, values)
        .then(result => {
            console.log(result.rows); // Logging the inserted rows
            res.status(200).json({ message: "Movie added successfully" });
        })
        .catch(error => {
            console.log("Meow Error" + error);
            res.status(500).json({ message: "Unable to add movie", error: error.toString() });
        });
});

// Route to get movies from the database
app.get('/getMovies', async (req, res) => {
    try {
        // Define the SQL query to select movies from the database
        const sql = 'SELECT * FROM movie';

        // Execute the query
        const result = await client.query(sql);

        // Extract the rows (movies) from the result
        const movies = result.rows;

        // Send the retrieved movies as a response
        res.status(200).json(movies);
    } catch (error) {
        // Handle any errors that occur during the query execution
        console.error("Error fetching movies from the database:", error);
        res.status(500).json({ message: "Unable to fetch movies from the database", error: error.toString() });
    }
});
// Route to update data on database
app.put('/update/:id' , async (req , res) => {
    const movieId = req.params.id;
    const {title, overview, release_date, poster_path, comment} = req.body;
    const sql = `UPDATE movie SET title = $1, overview = $2, release_date = $3, poster_path = $4, comment = $5 WHERE id = $6`;
    const values = [title, overview, release_date, poster_path, comment, movieId];
    client.query(sql , values) 
    .then(result => {
        res.send('Meow Suceefully updated') 
    })
    .catch(error => {
        console.log("Meow Error" + error);
        res.status(500).json({ message: "Unable to update movie", error: error.toString() });
})})

//Route to delete movies from the database
app.delete('/deleteMovies/:id', async (req, res) => {
    const movieId = req.params.id;
    try {
        // Define the SQL  query to select movies from the database
        const sql = 'DELETE FROM movie WHERE id = $1';
        const values = [movieId];

        // Execute the query
        const result = await client.query(sql , values);

        // Send the retrieved movies as a response
        res.send("Secussfuly Deleted");
    } catch (error) {
        // Handle any errors that occur during the query execution
        console.error("Error Deleting movies from the database:", error);
        res.status(500).json({ message: "Unable to Delete movies from the database", error: error.toString() });
    }
});

//Route to Get Data By ID
app.get('/getMovie/:id' , async(req, res) => {
    const movieId = req.params.id;
    try {
        const sql = 'SELECT * FROM movie WHERE id = $1';
        const values = [movieId];
        const result = await client.query(sql, values);
        if (result.rows.length === 0) {
            return res.status(404).json({message: "Movie not found"});
        }
        const movie = result.rows[0];
        res.status(200).json(movie);
    } catch (error) {
        console.error("Error fetching movie from the database:", error);
        res.status(500).json({message: "Unable to fetch movie from the database"})
    }
});



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
// when to serach for movies serach like that Example "http://localhost:3000/search?title=dune"
// Route to search movies
app.get('/search', async (req, res) => {
    const SEARCH_BAR = req.query.title;
    const config = {
        method: 'get',
        url: `${BASE_URL}/search/movie?query=${SEARCH_BAR}&api_key=${API_KEY}&language=en-US`
    };

    try {
        const response = await axios(config);
        const movies = response.data.results.map(movie => ({
            id: movie.id,
            title: movie.original_title, //original_title
            release_date: movie.release_date,
            poster_path: movie.poster_path,
            overview: movie.overview
        }));
        res.json(movies);
    } catch (error) {
        res.status(500).json({ message: "Unable to search movies", error: error.toString() });
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

// To connect the server
client.connect()
    .then(() => {
        app.listen(PORT, () => console.log(`Server is running on http://localhost:${PORT}`));
    })
    .catch();

