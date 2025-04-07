const mongoose = require("mongoose");
// const { default: isEmail } = require("validator/lib/isEmail");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    firstName : {
        type : String,
        minLength:3,
        maxLength:25
    },
    lastName : {
        type : String,
    },
    email :{
        type : String,
        unique: true,
        required:true,
        trim: true,
        lowercase:true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error("Invalid email format: " + value);
            }
        }
    },
    about :{
        type : String,
        default : "Passionate boy/girl looking for a developer who can develop my feelings for him/her"
    },
    password : {
        type : String,
        required : true
    },
    age : {
        type : Number,
        min : 18
    },
    photoUrl : {
        type : String,
        default : "https://geographyandyou.com/images/user-profile.png"
    },
    skills : {
        type : [String],
        default : ["Html","Css","frontend","backend"]
    },
    gender :{
        type : String,
        lowercase: true,
        validate(value){
            if(!["male","female","others"].includes(value)){
                throw new Error ("Hamare yaha sirf 3 hi gender hote hai")
            }
        }
    }
},{
    timestamps:true
})

userSchema.index({firstName:1, lastName:1})

userSchema.methods.getJWT = async function(){
    const user =  this
    const token = await jwt.sign({_id : user._id},"DEV@Tinder$798", {expiresIn:"7d"})
    return token;
}

userSchema.methods.validatePassword = async function(passwordInputByUser){
    const user = this;
    const passwordHash = user.password
    const isPasswordValid = await bcrypt.compare(passwordInputByUser, passwordHash);
    return isPasswordValid;
}

const User = mongoose.model("User",userSchema);
module.exports = User;