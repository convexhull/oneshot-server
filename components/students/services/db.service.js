const Students = require("../model");

/**
 * This module consists of data-base level apis
 */

function aggregateStudents(pipeline) {
    return Students.aggregate(pipeline);
}

module.exports = {
    aggregateStudents,
};
