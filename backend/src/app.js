// app.js
const express = require("express");
const app = express();

port = 3000;

// Routes
const mainRouter = require("./routes/api/mainRouter");
app.use("/", mainRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
