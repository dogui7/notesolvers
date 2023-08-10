const {Notes} = require("../../database/models");

const apiMainController = {
    index: (req, res) => {
        const data = {
            message: "The available endpoints are as follows:",
            allNotes: "http://localhost:3000/api/notes",
            oneNote: "http://localhost:3000/api/notes/id"
        }
        res.status(200).json(data)
    }
}

module.exports = apiMainController;