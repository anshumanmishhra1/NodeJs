const mongoose = require('mongoose');

const connectionRequestSchema = mongoose.Schema({
    fromUserId : {
        type : mongoose.Schema.Types.ObjectId,
        required: true
    },
    toUserId : {
        type :  mongoose.Schema.Types.ObjectId,
        required:true
    },
    status : {
        type : String,
        enum : {
            values : ["ignore", "interested", "accepted", "rejected"],
            message : `{VALUE} is incorrect Not supported`
        },
        required:true
    }
},{
    timestamps:true,
})

connectionRequestSchema.index({fromUserId: 1, toUserId: 1});

connectionRequestSchema.pre("save",function(next){
    const connectionRequest = this;
    if(connectionRequest.fromUserId.require(connectionRequest.toUserId)){
        throw new Error("Can't send request to yourself");
    }
    next();
})
const ConnectionRequest = new mongoose.model("ConnectionRequest",connectionRequestSchema);
module.exports = ConnectionRequest;