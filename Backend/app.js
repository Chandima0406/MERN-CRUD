//JHBVSNJyXTg4WikZ

const express = require('express');
const mongoose = require('mongoose');
const routes = require('./Routes/Userroutes'); // Check if this path is correct

const app = express();
const cors = require('cors');

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to enable CORS
app.use(cors());
app.use("/users", routes);

mongoose.connect("mongodb+srv://admin:JHBVSNJyXTg4WikZ@cluster0.esofjyk.mongodb.net/")
.then(() => {
    console.log("Connected to MongoDB");
    app.listen(5000, () => {
        console.log("Server is running on port 5000");
    });
}).catch(err => {
    console.error("Failed to connect to MongoDB", err);
});

