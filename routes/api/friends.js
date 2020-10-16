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

module.exports = router;