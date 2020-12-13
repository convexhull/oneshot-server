const dbService = require("./db.service");
const mongoose = require("mongoose");


const getPopulatedCollegeDetailsById = async (payload) => {
    //use aggregation to populate student_ids with real students
    let aggregationPipeline = [
        {
            "$match" : {
                "_id" :  mongoose.Types.ObjectId(payload.id)
            }
        },
        {
            "$lookup" : {
                "from" : "students",
                "localField" : "student_ids",
                "foreignField": "_id",
                "as": "students"
            }
        },
        {
            "$project" : {
                "student_ids" : 0
            }
        }
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
        results = await dbService.findColleges(
            criteria,
            projection,
            options
        );
        return results;
    } catch (e) {
        console.log(e);
        throw e;
    }
};


const filterColleges = async (payload) => {
    let criteria = {

    };
    if(payload.course) {
        criteria.courses = payload.course
    }
    if(payload.state) {
        criteria.state = payload.state;
    }
    let projection = {};
    let options = {};
    let results = [];
    try {
        results = await dbService.findColleges(
            criteria,
            projection,
            options
        );
        return results;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

const calculateStatewiseStats = async (payload) => {
    let aggregationPipeline = [
        {
            "$group": {
                "_id" : {
                    "state" : "$state"
                },
                "count" : { "$sum" : 1}
            }
        }
    ]
    let results = [];
    try {
        results = await dbService.aggregateColleges(aggregationPipeline);
        let totalCount = await dbService.countColleges();
        results.forEach( res => {
            res.percentage = Number(((res.count/totalCount)*100).toFixed());
        })
        let finalResults = [];
        results.forEach( res => {
            finalResults.push({
                name: res._id.state,
                value: res.percentage
            })
        })
        return finalResults;
    } catch (e) {
        console.log(e);
        throw e;
    }
};


const calculateCoursewiseStats = async (payload) => {
    let aggregationPipeline = [
        {
            "$unwind" : "$courses"
        },
        {
            "$group": {
                "_id" : {
                    "course" : "$courses"
                },
                "count" : { "$sum" : 1}
            }
        }
    ]
    let results = [];
    try {
        results = await dbService.aggregateColleges(aggregationPipeline);
        let totalCount = await dbService.countColleges();
        results.forEach( res => {
            res.percentage = Number(((res.count/totalCount)*100).toFixed());
        })
        let finalResults = [];
        results.forEach( res => {
            finalResults.push({
                name: res._id.course,
                value: res.percentage
            })
        })
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
            "$match": {
                "city" : city
            }
        }
    ]
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
    getSimilarColleges
};
