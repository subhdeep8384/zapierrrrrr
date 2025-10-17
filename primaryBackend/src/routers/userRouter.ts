import { Router  } from "express";
import  jwt  from "jsonwebtoken";
import { authMiddleware } from "./middleware";
import { signInSchema , signUpSchema } from "../types";
import { prismaClient } from "../db";
import dotenv from "dotenv";
import { JWT_PASSWORD } from "../config";
dotenv.config();


const router = Router();
router.post("/signup", async (req, res) => {
   
    const parsedData = signUpSchema.safeParse(req.body);
    if (!parsedData.success) {
      return res.status(400).json({
        status: 400,
        message: "Invalid request data",
      });
    }
  
    const { email } = parsedData.data;
  
    const userExists = await prismaClient.user.findFirst({
      where: { email },
      select: { id: true, username: true, image: true },
    });
  
    if (!userExists) {
     
      const newUser = await prismaClient.user.create({
        data: parsedData.data,
      });
  
   
      const token = jwt.sign(
        { id: newUser.id, username: newUser.username, image: newUser.image },
        JWT_PASSWORD,
        { expiresIn: "7d" }
      );
  
      res.cookie("token", token, { httpOnly: true, sameSite: "lax", path: "/" });
  
      return res.status(201).json({
        status: 201,
        message: "User created successfully",
        data: newUser,
      });
    }
  
  
    const token = jwt.sign(
      { id: userExists.id, username: userExists.username, image: userExists.image },
      JWT_PASSWORD,
      { expiresIn: "7d" }
    );
  
    res.cookie("token", token, { httpOnly: true, sameSite: "lax", path: "/" });
  
    return res.status(200).json({
      status: 200,
      message: "Login successful",
      data: userExists, 
    });
  });


router.get("/signin", async (req , res ) =>{
    const body = req.body;
    const parsedData = signInSchema.safeParse(body);
    if(!parsedData.success){
        return res.status(400).json(parsedData.error)
    }

    const userExists = await  prismaClient.user.findFirst({
        where:{
            email:parsedData.data.email ,
        } ,
        select:{
            id :true  ,
            username : true ,
            password : true 
        }
    })
    if( !userExists ){
        return res.status(400).json("User does not exist")
    }
    
    const token = jwt.sign({
        id : userExists.id ,
        username : userExists.username ,
    } ,JWT_PASSWORD)

    res.cookie("token" , token ) ;
    
    res.status(200).json(
        {message :"login successful"}
    )
})

router.get("/me" , authMiddleware  , (req , res )=>{
    // @ts-ignore
    const body = req.user ;
    return res.send(body)
})

export const userRouter = router;