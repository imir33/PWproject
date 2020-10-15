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

// @route    POST api/books
// @desc     Add a new book entry
// @access   Private
router.post(
  '/',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('author', 'Author is required').not().isEmpty(),
      check('numberOfPages', 'Number of pages is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const user = await User.findById(req.user.id).select('-password');

      const { title, author, numberOfPages, currentPage } = req.body;

      const newBook = new Book({
        user: req.user.id,
        title: title,
        author: author,
        numberOfPages: Number.parseInt(numberOfPages),
        currentPage: Number.parseInt(currentPage),
      });

      const book = await newBook.save();

      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

module.exports = router;