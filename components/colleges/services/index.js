const dbService = require("./db.service");

const getAllColleges = async (user) => {
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



module.exports = {
    getAllColleges,
    filterColleges,
    calculateStatewiseStats
};
