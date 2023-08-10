const {Notes} = require("../../database/models");

const notesController = {

    // GET /api/notes/all
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

    // GET /api/notes/note/:id
    oneNote: async (req, res) => {
        try {
            const noteId = req.params.id
            const note = await Notes.findByPk(noteId);

            if (!note) {
                return res.status(404).json({message: `Note with id ${noteId} not found`})
            }

            res.status(200).json(note)
        } catch (error) {
            console.error("Error fetching note: ", error);
            res.status(500).json({
                message: "An error ocurred while fetching the note"
            })
        }
    },
    
    // POST /api/notes/addNote/:id
    createNote: async (req, res) => {
        try {
            const newNote = await Notes.create(req.body);
            res.status(200).json({message: "New note added", newNote})
        } catch (error) {
            console.error("Error creating note: ", error);
            res.status(500).json({
                message: "An error ocurred while creating the new note"
            })
        }
    },

    // PUT /api/notes/editNote/:id
    editNote: async (req, res) => {
        try {
            const noteId = req.params.id
            const updatedNoteData = req.body;

            const note = await Notes.findByPk(noteId);

            if (!note) {
                return res.status(404).json({message: `Note with id ${noteId} not found`})
            }

            await Notes.update(updatedNoteData, {
                where: {id: req.params.id}
            });

            res.status(200).json({message: `Note with id ${noteId} edited`, editedNote: updatedNoteData})
        } catch (error) {
            console.error("Error editing note: ", error);
            res.status(500).json({
                message: `An error ocurred while editing the note with id ${noteId}`
            })
        }
    },

    // DELETE /api/notes/deleteNote/:id
    deleteNote: async (req, res) => {
        try {
            const noteId = req.params.id

            const note = await Notes.findByPk(noteId);

            if (!note) {
                return res.status(404).json({message: `Note with id ${noteId} not found`})
            }

            await Notes.destroy({
                where: {id: req.params.id}
            });

            res.status(200).json({message: `Note with id ${noteId} deleted`})
        } catch (error) {
            console.error("Error deleting note: ", error);
            res.status(500).json({
                message: `An error ocurred while deleting the note with id ${noteId}`
            })
        }
    },



}

module.exports = notesController;