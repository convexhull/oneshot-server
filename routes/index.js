const express = require('express');

const router = express.Router();


const CollegeRouter = require('../components/colleges/router');




router.get('/ping', (req, res) => {
  res.send({
    reply: "pong"
  })
});

router.use('/colleges', CollegeRouter );

module.exports = router;
