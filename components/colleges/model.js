const mongoose = require("mongoose");

const Schema = mongoose.Schema;


const CollegeSchema = Schema({
    name: { type: String },
    yearFounded: { type: Number },
    city: { type: String },
    state: { type: String },
    country: { type: String },
    courses: [ {type: String} ],
    student_ids: [{type: Schema.Types.ObjectId, ref: "Student"}]
});

module.exports = mongoose.model("College", CollegeSchema);
