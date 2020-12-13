const Students  = require('../model');

function aggregateStudents(pipeline) {
    return Students.aggregate(pipeline);
}

module.exports = {
    aggregateStudents
}