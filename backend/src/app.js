// app.js
const express = require("express");
const app = express();

port = 3000;

// Routes
app.get("/", (req, res) => {
    res.send("Hi, Dogui!")
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
