const express = require('express');
const router = express.Router();

// @route    GET api/books
// @desc     Test Route
// @access   Public
router.get('/', (req, res) => res.send('Books Route'));

module.exports = router;