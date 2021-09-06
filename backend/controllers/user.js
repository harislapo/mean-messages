const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;

  // check if email exists
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      // If user is found set it to variable
      // in order to use it in other then blocks
      fetchedUser = user;

      // compare hashes of the entered password
      // with the one in the db
      return bcrypt.compare(req.body.password, user.password);
    })
    // result of the hash compare will be boolean
    .then((hashResult) => {
      if (!hashResult) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }

      //create token
      const token = jwt.sign(
        { email: fetchedUser.email, userId: fetchedUser._id },
        process.env.JWT_KEY,
        { expiresIn: "1h" }
      );

      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentiaction credentials!",
      });
    });
};
