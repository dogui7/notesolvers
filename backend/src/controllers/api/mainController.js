const {Notes} = require("../../database/models");

const apiMainController = {
    index: (req, res) => {
        const data = {
            message: "The available endpoints are as follows:",
            allNotes: "http://localhost:3000/notes",
            oneNote: "http://localhost:3000/notes/id"
        }
        res.status(200).json(data)
    },

    testNotes: async (req, res) => {
        try {
            /* const notes = await db.Notes.findAll(); */
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

module.exports = apiMainController;