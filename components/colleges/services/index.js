const dbService = require("./db.service");
const mongoose = require("mongoose");

/**
 * Services module
 * # All the services go here.
 * # Ideally they shouldn't have any interaction with express (req, res). They just work on the input from Controller.
 * # These interacted with DB and other lower level services
 */

const getPopulatedCollegeDetailsById = async (payload) => {
    //use aggregation to populate student_ids with real students
    let aggregationPipeline = [
        {
            $match: {
                _id: mongoose.Types.ObjectId(payload.id),
            },
        },
        {
            $lookup: {
                from: "students",
                localField: "student_ids",
                foreignField: "_id",
                as: "students",
            },
        },
        {
            $project: {
                student_ids: 0,
            },
        },
    ];
    let colleges = [];
    try {
        colleges = await dbService.aggregateColleges(aggregationPipeline);
        return colleges[0];
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const getAllColleges = async () => {
    let criteria = {};
    let projection = {};
    let options = {};
    let results = [];
    try {
        results = await dbService.findColleges(criteria, projection, options);
        return results;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const filterColleges = async (payload) => {
    let criteria = {};
    //filter depending upon the query params
    if (payload.course) {
        criteria.courses = payload.course;
    }
    if (payload.state) {
        criteria.state = payload.state;
    }
    let projection = {};
    let options = {};
    let results = [];
    try {
        results = await dbService.findColleges(criteria, projection, options);
        return results;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const calculateStatewiseStats = async (payload) => {
    //This pipeline groups by states and finds the count of number of colleges in a state
    let aggregationPipeline = [
        {
            $group: {
                _id: {
                    state: "$state",
                },
                count: { $sum: 1 },
            },
        },
    ];
    let results = [];
    try {
        results = await dbService.aggregateColleges(aggregationPipeline);
        let totalCount = await dbService.countColleges();
        //calculate percentage
        results.forEach((res) => {
            res.percentage = Number(((res.count / totalCount) * 100).toFixed());
        });
        let finalResults = [];
        //format data in format needed by client app
        results.forEach((res) => {
            finalResults.push({
                name: res._id.state,
                value: res.percentage,
            });
        });
        return finalResults;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const calculateCoursewiseStats = async (payload) => {
    //This aggregation pipeline is for calculating number of colleges in which each course is being taught
    let aggregationPipeline = [
        {
            $unwind: "$courses",
        },
        {
            $group: {
                _id: {
                    course: "$courses",
                },
                count: { $sum: 1 },
            },
        },
    ];
    let results = [];
    try {
        results = await dbService.aggregateColleges(aggregationPipeline);
        let totalCount = await dbService.countColleges();
        let totalOccurence = 0;
        results.forEach((res) => {
            //course-wise perctange i.e percentage of colleges teaching this course. But we actually need relative percentage
            res.percentage = Number(((res.count / totalCount) * 100).toFixed());
            totalOccurence += res.count;
        });
        let finalResults = [];
        results.forEach((res) => {
            finalResults.push({
                name: res._id.course,
                //calculate relative percentage (out of 100)
                value: Number(
                    ((res.percentage / totalOccurence) * 100).toFixed()
                ),
            });
        });
        return finalResults;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const getSimilarColleges = async (payload) => {
    let city = payload.city;
    let aggregationPipeline = [
        {
            $match: {
                city: city,
            },
        },
    ];
    let results = [];
    try {
        results = await dbService.aggregateColleges(aggregationPipeline);
        let finalResults = results;

        return finalResults;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

module.exports = {
    getAllColleges,
    filterColleges,
    calculateStatewiseStats,
    calculateCoursewiseStats,
    getPopulatedCollegeDetailsById,
    getSimilarColleges,
};
