import express from 'express'
import { prismaClient } from '../db';
const router = express.Router() ;


router.get("/available" ,async (req , res ) => {
    const availableTrigger = await prismaClient.availableTrigger.findMany({});
    res.send(availableTrigger)
})
export const triggerRouter = router;