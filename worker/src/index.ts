import { PrismaClient } from "@prisma/client";
import { Kafka } from "kafkajs";

const TOPIC_NAME = "zap-events" 


const client = new PrismaClient() 

const kafka = new Kafka( {
    clientId : "outbox-processor" ,
    brokers : ['localhost:9092']
})


async function worker(){
    const consumer = kafka.consumer({
        groupId : 'main-worker'
    }) 

    await consumer.connect() 
    await consumer.subscribe({topic: TOPIC_NAME , fromBeginning : true })
    await consumer.run({
        autoCommit : false ,
        eachMessage: async ({ topic : TOPIC_NAME , partition, message }) => {
          console.log({
            partition,
            offset: message.offset,
            value: message.value?.toString(),
          })

          await new Promise(r => setTimeout(r , 3000))
        
          await consumer.commitOffsets([
            {
              topic: TOPIC_NAME,
              partition: partition,
              offset: (parseInt(message.offset, 10) + 1).toString(), // Must be a string
            }
          ])
        },
      })
}

worker() ;