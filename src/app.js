const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const app = express();


//here we are creating the signup route for creating the user
app.post("/signup",async (req,res)=>{
  const user = new User({
    firstName:"Pritam",
    lastName : "Kumar",
    email : "pritam@gmail.com",
    password : "123456789"
  })

  try {
    await user.save();
    res.send("User created Successfully");
  } catch (error) {
    res.status(400).send("Something went Wrong!!",error);
  }
})


connectDB().then(
  console.log(`mongodb connected successfully`),
  app.listen(7777,()=>{
    console.log("server is running at 7777...")
  })
).catch((error)=>{
  console.error("Database connect hi nahi hua hai")
})
