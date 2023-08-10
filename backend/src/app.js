// app.js
const express = require("express");
const app = express();

port = 3000;

// Routes
const mainRouter = require("./routes/api/mainRouter");
app.use("/", mainRouter);

const notesRouter = require("./routes/api/notesRouter");
app.use("/api/notes", notesRouter);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
