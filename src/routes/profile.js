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
    // Debugging logs
    // console.log("Request Body: ", req.body);
    // console.log("Logged-in User: ", req.user);

    // Validate request body
    if (!req.body || typeof req.body !== "object" || Object.keys(req.body).length === 0) {
      return res.status(400).send("Error: Request body cannot be empty or invalid.");
    }

    // Ensure logged-in user exists
    const loggedInUser = req.user;
    if (!loggedInUser) {
      return res.status(404).send("Error: Logged-in user not found.");
    }

    // Validate edit profile data
    if (!validateEditProfileData(req)) {
      return res.status(400).send("Error: Validation failed for profile edit request.");
    }

    // Update fields
    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));

    // Save the updated user
    await loggedInUser.save();
    res.send("Profile Edited Successfully🚀");
  } catch (error) {
    // console.error("Error: ", error.message);
    res.status(400).send("Error: " + error.message);
  }
});



module.exports = profileRouter;
