const express = require("express");
const connectDB = require("./config/database");
const cookieParser = require("cookie-parser");
const app = express();
const userAuth = require("../src/routes/auth");
const profileAuth = require("../src/routes/profile");
const requestAuth = require("../src/routes/request");
app.use(express.json());
app.use(cookieParser());
//here we are creating the signup route for creating the user

app.use("/", userAuth);
app.use("/", profileAuth);
app.use("/", requestAuth);




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
