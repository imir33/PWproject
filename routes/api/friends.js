const e = require('express');
const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const User = require('../../models/User');

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

// @route    PUT api/friends/:email
// @desc     Add friend by email
// @access   Private
router.put('/:email', auth, async (req, res) => {
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

    await user.save();

    res.json(user.friends);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;