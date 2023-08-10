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
    }

}

module.exports = notesController;