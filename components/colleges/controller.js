const services = require("./services");

/**
 * Controller module
 * # These are responsible for handing (req, res) from express and formatting the api response and errors
 * # Don't add services level funtionalities here. User services/index.js for them.
 */

const getPopulatedCollegeDetailsById = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null,
    };
    try {
        let college = await services.getPopulatedCollegeDetailsById(req.query);
        responseData.data = college;
        responseData.message = "College fetched successfully";
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

const getAllColleges = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null,
    };
    try {
        let colleges = await services.getAllColleges();
        responseData.data = colleges;
        responseData.message = "Colleges fetched successfully";
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

const filterColleges = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null,
    };
    try {
        let colleges = await services.filterColleges(req.query);
        responseData.data = colleges;
        responseData.message = "Colleges fetched successfully";
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

const calculateStatewiseStats = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null,
    };
    try {
        let results = await services.calculateStatewiseStats();
        responseData.data = results;
        responseData.message = "Results fetched successfully";
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

const calculateCoursewiseStats = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null,
    };
    try {
        let results = await services.calculateCoursewiseStats();
        responseData.data = results;
        responseData.message = "Results fetched successfully";
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

const getSimilarColleges = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null,
    };
    try {
        let results = await services.getSimilarColleges(req.query);
        responseData.data = results;
        responseData.message = "Results fetched successfully";
        res.send(responseData);
    } catch (e) {
        console.log(e);
        responseData = {
            success: false,
            error: true,
            message: "Some error occurred",
        };
        res.status(500).send(responseData);
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
