# Movies-Library - Version 1.1

**Author Name**: Mahmoud Nassar

## WRRC Diagram
![WRRC](WRRC_Diagram.jpg)

## Overview
Movies-Library is a web application designed to provide detailed information about movies. It includes features for trending, popular, and top-rated films. Built with Node.js using the Express framework, this application demonstrates how to create and manage web routes that integrate with external APIs such as The Movie DB.

## Getting Started
Follow these steps to get the application running on your machine:

1. **Clone the repository:**

https://github.com/Mahmoud1Nassar/Movies-Library.git


2. **Install dependencies:**
Navigate to the project directory and run:


3. **Set up environment variables:**
Create a `.env` file in the root directory and add your The Movie DB API key:


4. **Start the server:**


## Project Features
- **Home Page Endpoint (`/`):** Returns detailed JSON data about "Spider-Man: No Way Home".
- **Favorite Page Endpoint (`/favorite`):** Provides a simple greeting text indicating the user is on the favorites page.
- **Trending Movies Endpoint (`/trending`):** Fetches and displays trending movies data for the current week.
- **Popular Movies Endpoint (`/popular-movies`):** Retrieves a list of currently popular movies.
- **Top Rated Movies Endpoint (`/top-rated-movies`):** Provides a list of top-rated movies according to The Movie DB.
- **Error Handling:** Functions to handle "500 Internal Server Error" and "404 Not Found" to improve application robustness.

## Updates in Version 1.1
- Added new endpoints to fetch trending, popular, and top-rated movies using The Movie DB API.
- Updated the project structure to support better error handling and response management.
- Enhanced the documentation to reflect new features and setup instructions.

