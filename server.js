// Import the express library
const express = require('express');

// Create an instance of express
const app = express();

// Define the port number
const PORT = process.env.PORT || 3000;

// Constructor function for Data Format
function DataFormat(message) {
    this.message = message;
}
//Movie page Endpoint
function Movie(title, poster_path, overview) {
    this.title = title;
    this.poster_path = poster_path;
    this.overview = overview;
}

// Home Page Endpoint
app.get('/favorite', (req, res) => {
    // Create an instance of DataFormat with a message
    const responseData = new DataFormat('Welcome to Favorite Page');
    // Send the JSON response
    res.json(responseData);
    
});

app.get('/', (req, res) => {
    const responseMovie = new Movie("Spider-Man: No Way Home", `/1g0dhYtq4irTY1GPXvft6k4YLjm.jpg`, "Peter Parker is unmasked and no longer able to separate his normal life from the high-stakes of being a super-hero. When he asks for help from Doctor Strange the stakes become even more dangerous, forcing him to discover what it truly means to be Spider-Man.");
    res.json(responseMovie);
})

//Error Handling
app.use((req, res) => {
    res.status(404).json({status: 404, responseText: "Page not Found"})
});

app.use((err,req,res,next) => {
    res.status(500).json({status: 500, responseText: "Sorry, something went wrong"});
});


// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


