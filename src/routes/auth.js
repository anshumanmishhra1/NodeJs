const express = require("express");
const authRouter = express.Router();
const User = require("../model/user")
const bcrypt = require('bcrypt');
const { signupValidation } = require("../utils/validation");



authRouter.post("/signup", async (req, res) => {
  try {
    //validation of data
    const { firstName, lastName, email, password } = req.body;
    signupValidation(req);

    //encrypting of data
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    await user.save();
    res.send("User created Successfully go and check MongoDb");
  } catch (error) {
    res.status(404).send("Error saving the user" + error);
  }
});

authRouter.post("/login", async (req, res) => {
  try {
    //here we are find or creating the cookie after the user got logged in :
    const { email, password } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("Invalid Credentials");
    }

    const isPassword = await user.validatePassword(password);
    if (isPassword) {
      //create a jwt token
      const token = await user.getJWT();
      //add the token to cookie and send the response back to the user
      res.cookie("token", token, {
        expires: new Date(Date.now() + 8 * 3600000),
      });
      res.send("Swagat nahi karoge Hamara😎");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

module.exports = authRouter;
