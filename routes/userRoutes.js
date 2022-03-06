const express = require("express");
const router = express.Router();
const UserController = require("../controller/userController");

router
  .route("/")
  .post((req, res, next) => {
    const id = Math.floor(Math.random() * 400) + 1;
    req.body.uniqueId = id;
    next();
  }, UserController.addUser)
  .get(UserController.getAllUsers);

router
  .route("/record/:id")
  .get(UserController.getUser)
  .delete(UserController.deletUser)
  .patch(UserController.updateUser);

module.exports = router;
