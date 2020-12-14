const dbService = require("./db.service");
const mongoose = require("mongoose");

/**
 * Services module
 * # All the services go here.
 * # Ideally they shouldn't have any interaction with express (req, res). They just work on the input from Controller.
 * # These interacted with DB and other lower level services
 */

const getStudentDetailsById = async (payload) => {
    let aggregationPipeline = [
        {
            $match: {
                _id: mongoose.Types.ObjectId(payload.id),
            },
        },
        {
            $lookup: {
                from: "colleges",
                localField: "college_id",
                foreignField: "_id",
                as: "college",
            },
        },
        {
            $project: {
                college_id: 0,
                "college.student_ids": 0,
            },
        },
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
    getStudentDetailsById,
};
