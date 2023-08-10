const express = require ("express");
const router = express.Router();

const apiMainController = require ("../../controllers/api/notesController");


// Routes

router.get("/", apiMainController.allNotes);


module.exports = router;