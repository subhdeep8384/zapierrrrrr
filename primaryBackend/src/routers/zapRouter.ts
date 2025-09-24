import { Router } from "express";
import { authMiddleware } from "./middleware";
import { zapCreateSchema } from "../types";
import { prismaClient } from "../db";


const router = Router();

router.post("/" , authMiddleware ,async (req , res )=>{
    console.log("indide / route")
    const body = req.body ;
    console.log(body)
    const parsedData = zapCreateSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(400).json(parsedData.error)
    }
    // @ts-ignore
    const userId = req.id
    console.log(userId)
    console.log(parsedData.data)
    const { availableTriggerId, actions } = parsedData.data;


    await prismaClient.$transaction(async tx => {
        const zap = await tx.zap.create({
            data : {
                userId : userId ,
                triggerId : "" ,
                actions : {
                    create : actions.map( (action , index) => ({
                        actionId : action.availableActionId ,
                        sortingOrder : index ,
                    }))
                }
            }
        })
        const trigger = await tx.trigger.create({
            data :{
                triggerId : availableTriggerId as unknown as string ,
                zapId : zap.id
            }
        })

        await tx.zap.update({
            where : {
                id : zap.id
            } ,
            data : {
                triggerId : trigger.id
            }
        })

        res.json({
            message : "Zap created successfully" ,
            status : 200 ,
            data : zap
        })
    })   

})

router.get("/" , authMiddleware , async (req , res )=>{
    console.log("i am here")
    // @ts-ignore
   const id = req.id ;
   const zaps = await prismaClient.zap.findMany({
    where :{
        userId : id
    } , include : {
        actions : {
            include :{
                type : true
            }
        } ,
        trigger : {
            include : {
                type : true
            }
        }
    }
   })

   res.send({
    zaps : zaps
   })
})

router.get("/:zapId" , authMiddleware ,async (req , res )=>{ 

    const zap = await prismaClient.zap.findUnique({
        where :{
            id : req.params.zapId ,
            userId : req.body.userId as unknown as number
        }
    })

    res.send(zap)
})
export const zapRouter = router;
