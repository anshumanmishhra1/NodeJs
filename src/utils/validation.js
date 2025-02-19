const validator = require('validator');

const signupValidation = (req)=>{
     const {firstName,lastName,email,password} = req.body
    if(!firstName || !lastName){
        throw new Error("Bhai at least Nam Likhana to start kr do");
    }
    else if(!validator.isEmail(email)){
        throw new Error("Email aise likha jata? kru teri guddi lal");
    }
    else if(!validator.isStrongPassword(password)){
        throw new Error("Jab password hack hoga to mere pas mt ana , strong pass dal de please!!");
    }
    
}

module.exports={signupValidation};