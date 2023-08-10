// app.js
const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();

// Middlewares
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Routes
const mainRouter = require("./routes/api/mainRouter");
app.use("/", mainRouter);

const notesRouter = require("./routes/api/notesRouter");
app.use("/api/notes", notesRouter);

// Start the server
app.listen(process.env.BACK_PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.BACK_PORT}`);
});
