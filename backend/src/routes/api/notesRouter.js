const express = require ("express");
const router = express.Router();

const notesController = require ("../../controllers/api/notesController");


// Routes

router.get("/", notesController.allNotes);
router.post("/addNote", notesController.createNote);


module.exports = router;