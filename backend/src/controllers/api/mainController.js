const { Categories } = require("../../database/models");
const { Notes } = require("../../database/models");

const apiMainController = {
  index: (req, res) => {
    const data = {
      message: "The available endpoints are as follows:",
      test: "http://localhost:3000/test",
      allNotes: "http://localhost:3000/api/notes",
      oneNote: "http://localhost:3000/api/notes/id",
    };
    res.status(200).json(data);
  },

  test: async (req, res) => {
    try {
      const notes = await Notes.findAll({include: "category"});
      res.status(200).json(notes);
    } catch (error) {
      console.error("Error fetching categories: ", error);
      res.status(500).json({
        message: "An error ocurred while fetching categories",
      });
    }
  },
};

module.exports = apiMainController;
