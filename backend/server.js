const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');   

// To have environment variables in .env file
require('dotenv').config();

// How we create our express server
const app = express();
const port = process.env.PORT || 5001;  // The port that the express server will be on

// Middleware
app.use(cors());    
app.use(express.json());    // To parse json, cuz we weill be receiving json

// 
const uri = process.env.ATLAS_URI;
mongoose.connect(uri
    // , { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Adding the API end point routes
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter)
app.use('/users', usersRouter)

// What starts the server (listening on a certain port)
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});