const express = require ("express");
const router = express.Router();

const apiMainController = require ("../../controllers/api/mainController");

router.get("/", apiMainController.index);
router.get("/test", apiMainController.test);

module.exports = router;