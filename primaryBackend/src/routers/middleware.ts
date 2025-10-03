import { NextFunction , Request , Response } from "express";
import  jwt  from "jsonwebtoken";
import { JWT_PASSWORD } from "../config";



export const authMiddleware = (req : Request , res : Response , next : NextFunction) =>{
    const token = req.cookies.token ;
    if(!token){
        return res.status(401).json("Unauthorized")
    }

    try{
        const decoded = jwt.verify(token , JWT_PASSWORD);
        console.log("decodedddddd", decoded)
        if(!decoded){
            return res.status(401).json("Unauthorized")
        }
        // @ts-ignore
        req.user = decoded ;
        next()
    }
    catch(e){
        res.status(400).json({
            message : e ,
        })
    }
}