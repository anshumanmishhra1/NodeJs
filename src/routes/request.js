const express = require("express");
const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth")
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user")
requestRouter.post("/request/send/:status/:toUserId",userAuth, async(req,res)=>{
  try {
    const fromUserId = req.user._id;
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)){
      return res.status(400).json({
        message : "Invalid Status Type" + status
      })
    }

    //if there is an existing connection request or not 
    const existingConnectionRequest = await ConnectionRequest.findOne({
      $or : [
        {fromUserId,toUserId},
        {fromUserId:toUserId, toUserId:fromUserId}
      ]
      
    });

    const toUser = await User.findById(toUserId);
    if(!toUser){
      return res.status(400).json({
        message: "User not found"
      })
    }

    if(existingConnectionRequest){
      return res.status(400).send({
        message : "Connection request Already Exist"
      })
    }

    const connectionRequest = new ConnectionRequest({
      fromUserId,
      toUserId,
      status,
    });

    const data = connectionRequest.save();
    res.json({
      message : req.user.firstName + "is " + status + " in " + toUserId,
      data,
    })
  } catch (error) {
    res.status(404).send("Error" + error.message);
  }
})

module.exports = requestRouter;