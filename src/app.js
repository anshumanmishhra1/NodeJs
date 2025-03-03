const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const { signupValidation } = require("./utils/validation");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const app = express();
const {userAuth} = require("./middlewares/auth")

app.use(express.json());
app.use(cookieParser());
//here we are creating the signup route for creating the user
app.post("/signup", async (req, res) => {
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

app.get("/profile",userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (error) {
    console.log("Error : " + error.message);
  }
});

app.post("/login", async (req, res) => {
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
      res.cookie("token", token, {expires: new Date(Date.now() + 8*3600000)});
      res.send("Swagat nahi karoge Hamara😎");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    res.send("Error: " + error.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;

  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User Not Found!!");
    } else {
      res.send(users);
    }
  } catch (error) {
    res.status(404).send("User not found!!");
  }

  //hm hmesha user(jo ki ek model hai) usme mein hi find karenge jahir si bat hai isliye User.find
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    console.log(users);
    res.send(users);
  } catch (error) {
    res.status(404).send("kya kar raha hai bhai yaha koi nahi hai apna");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body._id;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("User Not found or deleted Already");
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const data = req.body;

  try {
    const ALLOWED_UPDATES = ["photoUrl", "about", "gender", "age", "skills"];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );

    if (!isUpdateAllowed) {
      throw new Error("Update not allowed");
    }

    if (data?.skills?.length > 10) {
      throw new Error("Skills cannot be more than 10");
    }

    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });

    res.send({ message: "User updated successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(400).send({ error: error.message });
  }
});

app.post("/sendConnectionRequest",userAuth, async(req,res)=>{
  const user = req.user;

  console.log("Sending a connection request");
  res.send(user.firstName + "sent a connection request");
})

connectDB()
  .then(
    console.log(`mongodb connected successfully`),
    app.listen(7777, () => {
      console.log("server is running at 7777...");
    })
  )
  .catch((error) => {
    console.error("Database connect hi nahi hua hai");
  });
