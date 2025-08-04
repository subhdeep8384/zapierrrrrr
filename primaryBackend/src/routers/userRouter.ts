import { Router  } from "express";

const router = Router();

router.post("/signup" , (req , res )=>{
    res.send("signup")
})

router.get("signin",(req , res ) =>{
    res.send("signin")
})

router.get("/" , authMiddleware  , (req , res )=>{
    res.send("user")
})
export const userRouter = router;