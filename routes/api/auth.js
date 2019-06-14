const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator/check');

const User = require('../../models/User');
const auth = require('../../middleware/auth');
const config = require('config');
const { sendMail } = require('../../utils/mailer');

// @route    GET api/auth
// @desc     Test route
// @access   Public
router.get('/', auth, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.send(user);
});

// @route    POST api/auth
// @desc     Authenticate user & get token
// @access   Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6-18 characters').isLength({
      min: 6,
      max: 18
    })
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid credentials' }] });
      }
      const payload = {
        user: {
          id: user.id
        }
      };
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// @route    POST api/auth/forgotpassword
// @desc     If user forgot the password, can send the email to the user
// @access   Public
router.post('/forgotpassword', async (req, res) => {
  if (!req.body && !req.body.email)
    return res.status(400).json({ errors: [{ msg: 'No email provided' }] });
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: 'No corresponding user found' }] });
    }
    const payload = {
      user: {
        id: user.id
      }
    };
    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 360000 },
      (err, token) => {
        if (err) throw err;
        // email data
        const emailData = {
          from: '792576519@qq.com',
          to: email,
          subject: 'Password Reset for DevConnector',
          text: `You requested password reset: ${config.get(
            'baseURL'
          )}/reset-password/${token}`,
          html: `<h3>You requeseted password reset</h3> <p>${config.get(
            'baseURL'
          )}/reset-password/${token}</p>`
        };
        user.updateOne({ resetPasswordLink: token }, (err, success) => {
          if (err) return res.json({ error: err });
          else return sendMail(emailData);
        });
      }
    );
    return res.status(200).json({
      message: `Password reset instruction has been sent to "${email}" if it exists in our system.`
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// @route    POST api/auth/resetpassword
// @desc     Reset password
// @access   Public
router.post(
  '/resetpassword',
  [
    check(
      'newPassword',
      'Please enter a password with 6-18 characters'
    ).isLength({
      min: 6,
      max: 18
    }),
    check('resetPasswordLink', 'Not a valid link')
      .not()
      .isEmpty()
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { resetPasswordLink, newPassword } = req.body;
    try {
      const user = await User.findOne({ resetPasswordLink });
      if (!user) {
        return res.status(400).json({
          message: `No valid user found.`
        });
      }
      // bcrypt
      const salt = await bcrypt.genSalt(10);
      const password = await bcrypt.hash(newPassword, salt);
      const updatedFields = {
        password: password,
        resetPasswordLink: ''
      };
      await User.findOneAndUpdate(
        { resetPasswordLink },
        { $set: updatedFields },
        { new: true }
      );
      return res.status(200).json({
        message: `Please login with your new password.`
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
