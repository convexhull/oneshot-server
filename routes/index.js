const express = require('express');

const router = express.Router();


const CollegeRouter = require('../components/colleges/router');
const StudentRouter = require('../components/students/router');


router.get('/ping', (req, res) => {
  res.send({
    reply: "pong"
  })
});

router.use('/colleges', CollegeRouter );
router.use('/students', StudentRouter);

module.exports = router;
