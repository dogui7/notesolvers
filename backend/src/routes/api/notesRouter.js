const express = require ("express");
const router = express.Router();

const notesController = require ("../../controllers/api/notesController");


// Routes

router.get("/all", notesController.allNotes);
router.get("/note/:id", notesController.oneNote);

router.post("/addNote", notesController.createNote);

router.put("/editNote/:id", notesController.editNote);

router.delete("/deleteNote/:id", notesController.deleteNote);


module.exports = router;