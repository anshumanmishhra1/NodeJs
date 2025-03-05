const jwt = require('jsonwebtoken');
const User = require('../model/user');

const userAuth = async (req,res,next)=>{
    try {
        const {token} = req.cookies;
        if(!token){
            throw new Error("Token is not valid")
        }
        const decodedObj = await jwt.verify(token,"DEV@Tinder$798")
        const {_id } = decodedObj;
        const user = await User.findById(_id)
        if(!user){
            throw new Error("User not Found")
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(404).send("Error" + error.message);
    }
}
module.exports = {userAuth}