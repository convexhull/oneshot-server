const express = require('express');
const CollegeController = require('./controller');


const router = express.Router();

router
    .get('/', CollegeController.getAllColleges)
    .get('/filter', CollegeController.filterColleges)
    .get('/statewise-stats', CollegeController.calculateStatewiseStats)
    .get('/coursewise-stats', CollegeController.calculateCoursewiseStats)
    .get('/details', CollegeController.getPopulatedCollegeDetailsById)
    .get('/similar-colleges', CollegeController.getSimilarColleges)

module.exports = router;