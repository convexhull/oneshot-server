const express = require("express");

const router = express.Router();

/**
 * This file barrels/exposes out all the routes from different components of the backend.
 * # Attaches prefix /colleges, /students etc. to the root route
 */

const CollegeRouter = require("../components/colleges/router");
const StudentRouter = require("../components/students/router");

router.get("/ping", (req, res) => {
    res.send({
        reply: "pong",
    });
});

router.use("/colleges", CollegeRouter);
router.use("/students", StudentRouter);

module.exports = router;
