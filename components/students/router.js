const express = require("express");

/**
 * Route definitions for 'colleges' component of the apis.
 * # Imported into src/routes/index
 */

const StudentController = require("./controller");

const router = express.Router();

router.get("/details", StudentController.getStudentDetailsById);

module.exports = router;
