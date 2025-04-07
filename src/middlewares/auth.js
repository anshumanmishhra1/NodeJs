const jwt = require('jsonwebtoken');
const User = require('../model/user');

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      return res.status(401).json({ success: false, message: "Token is missing!" });
    }

    const decodedObj = await jwt.verify(token, "DEV@Tinder$798");
    const { _id } = decodedObj;

    const user = await User.findById(_id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found!" });
    }

    req.user = user; // Attach user to the request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Error:", error.message);
    res.status(401).json({ success: false, message: "Authentication failed: " + error.message });
  }
};

module.exports = { userAuth };
