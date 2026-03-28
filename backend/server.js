const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Initialize the Express app
const app = express();

// Middleware
app.use(cors()); // Allows your frontend to make requests to this backend
app.use(express.json()); // Allows the server to accept JSON data in the request body

// A simple test route to make sure things are working
app.get('/', (req, res) => {
  res.send('Memory Assistant API is running!');
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});