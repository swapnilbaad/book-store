const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const jwt = require("jsonwebtoken");
//USer Model

const User = require("../../models/User");

// @route POST api/auth
// @desc Authenticate User
// @access Public

router.post("/", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ msg: "Please enter all fields" });
  }

  //check for existing model
  User.findOne({ email }).then(user => {
    if (!user) return res.status(400).json({ msg: "User does not exists" });

    bcrypt.compare(password, user.password).then(isMatch => {
      if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

      jwt.sign(
        {
          id: user.id
        },
        config.get("jwtSecret"),
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      );
    });
  });
});

// @route GET api/auth/user
// @desc Get user  data
// @access Private
router.get("/user", auth, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then(user => res.json(user));
});

module.exports = router;
