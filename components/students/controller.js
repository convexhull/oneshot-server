const services = require("./services");

/**
 * Controller module
 * # These are responsible for handing (req, res) from express and formatting the api response and errors
 * # Don't add services level funtionalities here. User services/index.js for them.
 */

const getStudentDetailsById = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null,
    };
    try {
        let student = await services.getStudentDetailsById(req.query);
        responseData.data = student;
        responseData.message = "Student fetched successfully";
        res.send(responseData);
    } catch (e) {
        responseData = {
            success: false,
            error: true,
            message: "Some error occurred",
        };
        res.status(500).send(responseData);
    }
};

module.exports = {
    getStudentDetailsById,
};
