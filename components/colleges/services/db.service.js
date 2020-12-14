const Colleges = require("../model");

/**
 * This module consists of data-base level apis
 */

function insertCollege(college) {
    let objToSave = new Colleges(college);
    return objToSave.save();
}

function findOneCollege(criteria, projection, options) {
    return Colleges.findOne(criteria, projection, options);
}

function findColleges(criteria, projection, options) {
    return Colleges.find(criteria, projection, options);
}

function updateCollege(criteria, updateObject, options) {
    return Colleges.findOneAndUpdate(criteria, updateObject, options);
}

function aggregateColleges(pipeline) {
    return Colleges.aggregate(pipeline);
}

function countColleges(criteria) {
    return Colleges.count(criteria);
}

module.exports = {
    insertCollege,
    findOneCollege,
    updateCollege,
    aggregateColleges,
    findColleges,
    countColleges,
};
