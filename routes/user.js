const router = require("express").Router();
const userController = require("../controller/user");

router.get("/", userController.getHomePage);
router.get("/games", userController.getGamesPage);
router.get("/Library", userController.getLibraryPage);
module.exports = router;
