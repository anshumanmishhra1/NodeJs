const express = require("express");
const connectDB = require("./config/database");
const User = require("./model/user");
const app = express();

app.use(express.json());
//here we are creating the signup route for creating the user
app.post("/signup",async (req,res)=>{
  const user = new User(req.body)
  try {
    await user.save();
    res.send("User created Successfully go and check MongoDb")
  } catch (error) {
    res.status(404).send("Something is getting error");
  }
})

app.get("/user",async (req,res)=>{
  const userEmail = req.body.email;

  try {
    const users = await User.find({email:userEmail});
    if(users.length===0){
      res.status(404).send("User Not Found!!");
    }else{
      res.send(users);
    }
  } catch (error) {
    res.status(404).send("User not found!!");
  }

  //hm hmesha user(jo ki ek model hai) usme mein hi find karenge jahir si bat hai isliye User.find
})

app.get("/feed",async(req,res)=>{
  try {
    const users = await User.find({});
    console.log(users);
    res.send(users);
  } catch (error) {
    res.status(404).send("kya kar raha hai bhai yaha koi nahi hai apna");
  }
})

app.delete("/user", async(req,res)=>{
  const userId = req.body._id;
  try {
    await User.findByIdAndDelete(userId);
    res.send("User Deleted Successfully");
  } catch (error) {
    console.log(error);
    res.status(400).send("User Not found or deleted Already");
  }
})

app.patch("/user",async (req,res)=>{
  const userId = req.body._id;
  const data = req.body;
  console.log(userId);
  const user = req.body;
  console.log(user);
  try {
    const user = await User.findByIdAndUpdate(userId,data);
    console.log(user);
    res.send("User Updated Successfully");
    
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went Wrong!!");
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
