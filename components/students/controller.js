const services = require('./services');



const getStudentDetailsById = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null
    };
    try {
        let student = await services.getStudentDetailsById(req.query);
        responseData.data = student;
        responseData.message = "Student fetched successfully";
        res.send(responseData);
    } catch(e) {
        responseData = {
            success: false,
            error: true,
            message: "Some error occurred",
        };
        res.status(500).send(responseData);
    }
}



module.exports = {
    getStudentDetailsById
}