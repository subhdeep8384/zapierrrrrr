import { Router } from "express";
import { authMiddleware } from "./middleware";

const router = Router();

router.get("/" , authMiddleware , (req , res )=>{
    res.send("zap")
})

router.post("/" , authMiddleware , (req , res )=>{
    res.send("zap")
})

router.get("/:zapId" , authMiddleware , (req , res )=>{        
    res.send("zap")
})
export const zapRouter = Router();
