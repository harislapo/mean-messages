// Check if there is attached token on the incoming request,
// and if there is - validate it.

const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  // Check incoming request's headers for token.

  // Token will look like "Bearer 56f26dhj...", split it
  // so we get only second part which is the actual token.
  try {
    const token = req.headers.authorization.split(" ")[1];

    // Decode incoming token and store it into a constant
    // so when next() is called we can use it in posts.js
    // since every middleware running after the check-auth.js
    // will have this extra piece of information.
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);

    // Extract wanted data from the incoming request
    req.userData = { email: decodedToken.email, userId: decodedToken.userId };

    next();
  } catch (error) {
    res.status(401).json({
      message: "You are not authenticated!",
    });
  }
};
