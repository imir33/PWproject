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

      const { title, author, numberOfPages, currentPage, finished, rating } = req.body;

      if (finished) {
        var newBook = new Book({
          user: req.user.id,
          title: title,
          author: author,
          numberOfPages: Number.parseInt(numberOfPages),
          currentPage: Number.parseInt(numberOfPages),
          finished: true,
          rating: Number.parseInt(rating),
        });
      } else {
        var newBook = new Book({
          user: req.user.id,
          title: title,
          author: author,
          numberOfPages: Number.parseInt(numberOfPages),
          currentPage: Number.parseInt(currentPage),
        });
      }

      const book = await newBook.save();

      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    POST api/books/edit/:id
// @desc     Edit a book
// @access   Private
router.post(
  '/edit/:id',
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
      let book = await Book.findById(req.params.id);

      const { title, author, numberOfPages, currentPage } = req.body;

      book.title = title;
      book.author = author;
      book.numberOfPages = numberOfPages;
      book.currentPage = currentPage;

      await book.save();

      res.json(book);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    DELETE api/books/:id
// @desc     Delete book by id
// @access   Private
router.delete('/:id', auth, async (req, res) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: 'Book not found' });
    }

    if (book.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await book.remove();

    res.json({ msg: 'Book removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;