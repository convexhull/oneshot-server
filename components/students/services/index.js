const dbService = require("./db.service");
const mongoose = require("mongoose");


const getStudentDetailsById = async (payload) => {
    let aggregationPipeline = [
        {
            "$match" : {
                "_id" :  mongoose.Types.ObjectId(payload.id)
            }
        },
        {
            "$lookup" : {
                "from" : "colleges",
                "localField" : "college_id",
                "foreignField": "_id",
                "as": "college"
            }
        },
        {
            "$project" : {
                "college_id" : 0,
                "college.student_ids": 0
            }
        }
    ];
    let students = [];
    try {
        students = await dbService.aggregateStudents(aggregationPipeline);
        //**revvv */
        return students[0];
    } catch (e) {
        console.log(e);
        throw e;
    }
};


module.exports = {
    getStudentDetailsById
};
