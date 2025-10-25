import express from "express" ;
import  { PrismaClient } from "@prisma/client"

import dotenv from 'dotenv';
dotenv.config();

const PORT = 5001 ; 
const client = new PrismaClient() 
const app = express() ;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/' , (req , res )=> {
    res.send("Hello World")
})
app.post("/hooks/catch/:userId/:zapId" ,async (req , res ) => { 
    console.log("inside hookls")
    const userId = req.params.userId ;
    const zapId = req.params.zapId ;
    const body = req.body ;
    // store trigger into the db 

    try{  
        await client.$transaction(async (tx)=>{
        const run = await tx.zapRun.create({
            data:{
                zapId : zapId ,
                metadata: body ,
            }
        })

        await tx.zapRunOutbox.create({
            data :{
                zapRunId : run.id ,
            }
        })
        res.json({
            message : "request sended please wait for sometime to get thing resolved" 
        })
    }) }
    catch(e){
        res.json(e)
        console.log(e)
    }  
    // push it into kafka or redis
    
})

app.listen(PORT , ()=>{
    console.log("Server runing on port :" , PORT )
})