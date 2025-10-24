import { Router } from "express";
import { authMiddleware } from "./middleware";
import { zapCreateSchema } from "../types";
import { prismaClient } from "../db";

const router = Router();

router.post("/", authMiddleware, async (req, res) => {
  console.log("INSIDE create Zap");

  const body = req.body;
  console.log("The cody is ::", body);
  const parsedData = zapCreateSchema.safeParse(body);
  console.log("Parsed data is ::", parsedData);

  if (!parsedData.success) {
    return res.status(400).json(parsedData.error);
  }

  // @ts-ignore
  const userId = parsedData.data.userId;

  try {
 
    await prismaClient.$transaction(async (tx) => {
      const userExists = await tx.user.findUnique({
        where: { id: userId },
      });
      if (!userExists) {
        return res.status(400).json({ error: `User with id ${userId} does not exist` });
      }

      const { availableTriggerId, actions , } = parsedData.data;
      const zap = await tx.zap.create({
        data: {
          userId: userId,
          triggerId: "",
          actions: {
            create: actions.map((action, index) => ({
              actionId: action.availableActionId,
              sortingOrder: index,
            })),
          },
        },
      });

      
      const trigger = await tx.trigger.create({
        data: {
          triggerId: availableTriggerId,
          zapId: zap.id,
        },
      });

      await tx.zap.update({
        where: { id: zap.id },
        data: { triggerId: trigger.id },
      });

      res.json({
        message: "Zap created successfully",
        status: 200,
        data: zap,
      });
    });
  } catch (err) {
    console.error("Error creating Zap:", err);
    res.status(500).json({ error: "Internal server error", details: err });
  }
});

router.get("/allzaps/:userId" , authMiddleware , async (req , res )=>{
    
  // @ts-ignore
 const id = parseInt(req.params.userId) ;
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
      }
  })

  res.send(zap)
})

export const zapRouter = router;
