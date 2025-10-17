import express from 'express'
import { prismaClient } from '../db';
const router = express.Router() ;


router.get("/available" ,async (req , res ) => {
    const availableActions = await  prismaClient.availableAction.findMany({});
    res.send(availableActions)
})
export const actionRouter = router;