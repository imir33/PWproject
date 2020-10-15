const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Book = require('../../models/Book');
const User = require('../../models/User');

// @route    GET api/books
// @desc     Get all books for current user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const filter = { user: req.user.id };
    const books = await Book.find(filter);
    
    if (typeof books === 'undefined' || books.length === 0) {
      return res.status(404).json({ msg: 'No books found for this user' });
    }

    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;