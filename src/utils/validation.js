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

const validateEditProfileData = (req) =>{
    const allowedEdits = ["firstName","lastName","age","gender","skills","about"];
    
    const isAllowed = Object.keys(req.body).every((field)=>{
        allowedEdits.includes(field);
    })
    
    return isAllowed;
}

module.exports={signupValidation,validateEditProfileData};