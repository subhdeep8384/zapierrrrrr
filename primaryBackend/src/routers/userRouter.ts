import { Router  } from "express";
import { authMiddleware } from "./middleware";
import { signInSchema } from "../types";

const router = Router();

router.post("/signup" , (req , res )=>{
    res.send("signup")
})

router.get("signin",(req , res ) =>{
    const body = req.body;
    const parsedData = signInSchema.safeParse(body);
    if(!parsedData.success){
        return res.status(400).json(parsedData.error)
    }

    const userExists = await 
})

router.get("/" , authMiddleware  , (req , res )=>{
    res.send("user")
})
export const userRouter = router;