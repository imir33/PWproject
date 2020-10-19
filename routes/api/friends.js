const e = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');
const Book = require('../../models/Book');

// @route    GET api/friends
// @desc     Get all friends of current user
// @access   Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    if (user.friends.length === 0) {
      res.json({ msg: 'No friends found for this user' });
    } else {
      res.send(user.friends);
    }

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/friends/request/:email
// @desc     Add friend by email
// @access   Private
router.put('/request/:email', auth, async (req, res) => {
  try {
    const newFriend = await User.findOne({ email: req.params.email}).select('-password');

    // Check if User exists
    if (!newFriend) {
      return res.status(404).json({ msg: 'User not found' });  
    }

    const user = await User.findById(req.user.id).select('-password');

    // Check if is not already friend of user
    if (user.friends.some(friend => friend.user.toString() === newFriend.id)) {
      return res.status(400).json({ msg: 'User already a friend' });
    }
    user.friends.push({ user: newFriend.id });

    // Add current user to the newFried friends list
    newFriend.friends.push({ user: user.id });

    await user.save();
    await newFriend.save();

    res.json(user.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    DELETE api/friends/delete/:id
// @desc     Delete friend by id
// @access   Private
router.delete('/delete/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  if (user._id.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  var checkIfFriend = user.friends = user.friends.filter(
    ({ user }) => user.toString() === req.params.id
  );

  if (!(Array.isArray(checkIfFriend) && checkIfFriend.length)) {
    return res.status(400).json({ msg: 'The user is not a friend' });
  }

  user.friends = user.friends.filter(
    ({ user }) => user.toString() !== req.params.id
  );

  const friend = await User.findById(req.params.id).select('-password');

  if (!friend) {
    return res.status(404).json({ msg: 'Friend not found' });
  }

  friend.friends = friend.friends.filter(
    ({ user }) => user.toString() !== req.user.id
  )

  await user.save();
  await friend.save();

  return res.json(user.friends);

});

// @route    GET api/friends/books/:id
// @desc     Get all books of a friend
// @access   Private
router.get('/books/:id', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');

  if (!user) {
    return res.status(404).json({ msg: 'User not found' });
  }

  if (user._id.toString() !== req.user.id) {
    return res.status(401).json({ msg: 'User not authorized' });
  }

  var checkIfFriend = user.friends = user.friends.filter(
    ({ user }) => user.toString() === req.params.id
  );

  if (!(Array.isArray(checkIfFriend) && checkIfFriend.length)) {
    return res.status(400).json({ msg: 'The user is not a friend' });
  }

  const filter = { user: req.params.id };
  const friendBooks = await Book.find(filter);

  return res.json(friendBooks);
});

module.exports = router;