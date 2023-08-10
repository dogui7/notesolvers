const { Categories } = require("../../database/models");

const apiMainController = {
  index: (req, res) => {
    const data = {
      message: "The available endpoints are as follows:",
      allNotes: "http://localhost:3000/api/notes",
      oneNote: "http://localhost:3000/api/notes/id",
    };
    res.status(200).json(data);
  },

  test: async (req, res) => {
    try {
      const categories = await Categories.findAll();
      res.status(200).json(categories);
    } catch (error) {
      console.error("Error fetching categories: ", error);
      res.status(500).json({
        message: "An error ocurred while fetching categories",
      });
    }
  },
};

module.exports = apiMainController;
