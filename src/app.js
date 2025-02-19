const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const { signupValidation } = require("./utils/validation");
const bcrypt = require('bcrypt');
const app = express();

app.use(express.json());
//here we are creating the signup route for creating the user
app.post("/signup", async (req, res) => {
  try {
    //validation of data 
    const {firstName, lastName, email, password} = req.body;
    signupValidation(req);

    //encrypting of data
    const hashedPassword = await bcrypt.hash(password,10);
    const user = new User({
      firstName,lastName,email,password:hashedPassword
    });
    await user.save();
    res.send("User created Successfully go and check MongoDb");
  } catch (error) {
    res.status(404).send("Error saving the user"+ error);
  }
});

app.post("/login",async (req,res)=>{
  const {email, password} = req.body;
  try{
    const user = await User.findOne({email:email});
    if(!user){
      throw new Error("Invalid Credentials");
    }

    const isPassword = await bcrypt.compare(password,user.password);
    if(isPassword){
      res.status(200).send("Swagat nahi karoge hamara😎");
    }else{
      throw new Error("Invalid Credentials");
    }
  }catch(error){
    res.send("Error" + error.message);
  }
})

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
