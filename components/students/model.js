const mongoose = require("mongoose");

/**
 * File for defining DB schema
 */

const Schema = mongoose.Schema;

const StudentSchema = Schema({
    name: { type: String },
    yearOfBatch: { type: Number },
    college_id: Schema.Types.ObjectId,
    skills: [{ type: String }],
});

module.exports = mongoose.model("Student", StudentSchema);
