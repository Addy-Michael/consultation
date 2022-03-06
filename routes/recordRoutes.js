const express = require("express");
const router = express.Router();
const RecordController = require("../controller/recordController");
const AuthController = require("../controller/authController");

router.route("/record").post(
  AuthController.restrictTo("officer", "doctor"),
  (req, res, next) => {
    const id = Math.floor(Math.random() * 400) + 1;
    req.body.uniqueId = id;
    next();
  },
  RecordController.addRecord
);

router.post(
  "/all/records/",
  AuthController.restrictTo("officer", "doctor", "nurse"),
  RecordController.getAllRecords
);

router
  .route("/record/:id")
  .get(RecordController.getRecord)
  .delete(RecordController.deletRecord)
  .patch(
    AuthController.restrictTo("officer", "doctor"),
    RecordController.updateRecord
  );

module.exports = router;
