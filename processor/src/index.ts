import { PrismaClient } from "@prisma/client"
import { Kafka } from "kafkajs"
const client = new PrismaClient()

const TOPIC_NAME = "zap-events"

const kafka = new Kafka({
    clientId: 'outbox-processor',
    brokers: ['localhost:9092',],
})

async function processor(){
    const producer = kafka.producer() 
    await producer.connect()

    while( true ){
        const pendingRows = await client.zapRunOutbox.findMany({
            where :{} ,
            take : 10 ,
        })

        producer.send({
            topic : TOPIC_NAME ,
            messages: pendingRows.map((row) => ({
                value: row.zapRunId, 
            }))
        })

        await client.zapRunOutbox.deleteMany({
            where :{
                id : {
                    in : pendingRows.map(row => row.id)
                }
            }
        })
    }
}

processor() 