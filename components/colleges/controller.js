const services = require('./services');


const getAllColleges = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null
    };
    try {
        let colleges = await services.getAllColleges();
        responseData.data = colleges;
        responseData.message = "Colleges fetched successfully";
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



const filterColleges = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null
    };
    try {
        let colleges = await services.filterColleges(req.query);
        responseData.data = colleges;
        responseData.message = "Colleges fetched successfully";
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

const calculateStatewiseStats = async (req, res) => {
    let responseData = {
        success: true,
        error: false,
        message: ``,
        data: null
    };
    try {
        let results = await services.calculateStatewiseStats();
        responseData.data = results;
        responseData.message = "Results fetched successfully";
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
    getAllColleges,
    filterColleges,
    calculateStatewiseStats
}