const express = require("express");
const profileRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.log("Error : " + error.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req.body)) {
      throw new Error("Validation failed for profile edit request.");
    }
    
    const loggedInUser = req.user;
    console.log(loggedInUser);
    Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]))
    console.log(loggedInUser);  
    await loggedInUser.save();
    res.send("Profile Edited Successfully🚀");
  } catch (error) {
    res.status(400).send("Error : " + error.message);
  }
});

module.exports = profileRouter;
