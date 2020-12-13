const express = require('express');

const CollegeController = require('./controller');

const router = express.Router();

router
    .get('/', CollegeController.getAllColleges)
    .get('/filter', CollegeController.filterColleges)
    .get('/statewise-stats', CollegeController.calculateStatewiseStats)

module.exports = router;