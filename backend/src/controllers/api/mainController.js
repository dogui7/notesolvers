const { Categories } = require("../../database/models");
const { Notes } = require("../../database/models");

const apiMainController = {
  index: (req, res) => {
    const data = {
      message: "The available endpoints are as follows (TBA):",
    };
    res.status(200).json(data);
  }
};

module.exports = apiMainController;
