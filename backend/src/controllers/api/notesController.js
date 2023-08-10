const {Notes} = require("../../database/models");

const notesController = {

    allNotes: async (req, res) => {
        try {
            const notes = await Notes.findAll();
            res.status(200).json(notes)
        } catch (error) {
            console.error("Error fetching notes: ", error);
            res.status(500).json({
                message: "An error ocurred while fetching notes"
            })
        }
    },
    
    createNote: async (req, res) => {
        try {
            const newNote = await Notes.create(req.body);
            res.status(200).json(newNote)
        } catch (error) {
            console.error("Error creating note: ", error);
            res.status(500).json({
                message: "An error ocurred while creating the new note"
            })
        }
    },



}

module.exports = notesController;