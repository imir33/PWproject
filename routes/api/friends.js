const express = require('express');
const router = express.Router();

// @route    GET api/friends
// @desc     Test Route
// @access   Public
router.get('/', (req, res) => res.send('Friends Route'));

module.exports = router;