import jwt from "jsonwebtoken"
import User from "../models/User.js"
import asyncHandler from "./asyncHandler.js"


//check if the user is authenticated or not

const authenticate = asyncHandler(async (req, res, next) => {
    let token;

    // read JWT from the 'jwt' cookie
    token = req.cookies.jwt;

    // first if we have the token we're going to be just decoding the
    // token. We would need every single thing about the user but we don't wanna get the password
    // and then finally we want to get to the next middleware

    if(token){
        try {
            const decoded=jwt.verify(token, process.env.JWT_SECRET)
            req.user=await User.findById(decoded.userId).select('-password')
            next();
        } catch (error) {
            res.status(401)
            throw new Error("Not authorized, token failed.")
        }
    }else{
        // In case we don't have the token
        res.status(401);
        throw new Error("Not authorized, no token")
    }
})

//check if the user is admin or not

const authorizeAdmin=(req,res,next)=>{
    if(req.user && req.user.isAdmin){
        next()
    }else{
        res.status(401).send("Not authorized as an admin");

    }
}

export {authenticate, authorizeAdmin};