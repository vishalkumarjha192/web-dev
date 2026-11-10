// Step 0: npm init -y

// Step 1: Import Express
const express = require("express");

// Step 2: Create Express app
const app = express();

// Step 3: Home route
app.get("/", (req, res) => {
    res.send("Home Page");
});

// Step 4: About route
app.get("/about", (req, res) => {
    res.send("About Page");
});

// Step 5: Start server
app.listen(8080, () => {
    console.log("Server started.....");
});