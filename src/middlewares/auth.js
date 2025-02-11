const adminAuth = (req,res,next)=>{
    const token = "xyz";
    const isAuthenticated=token=="xyz";
    if(!isAuthenticated){
        console.log("Bhai sahi chiz to dal");
        res.status(401).send("UnAuthorized Access");
    }else{
        next();
    }
}

module.exports={
    adminAuth
}