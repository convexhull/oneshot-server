const express = require('express');
const StudentController = require('./controller');


const router = express.Router();

router
    .get('/details', StudentController.getStudentDetailsById)

module.exports = router;