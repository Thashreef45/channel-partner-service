import * as amqp from 'amqplib'
import { config } from "dotenv"
config()


const URL = String(process.env.RabbitMq_PORT)

const publisher = async (queue: string, data: any) => {
    try {
        const connection = await amqp.connect(URL)
        const channel = await connection.createChannel()
        await channel.assertQueue(queue)
        channel.sendToQueue(queue, Buffer.from(JSON.stringify(data)))
        await channel.close()
        await connection.close()
    } catch (error) {
        console.log(error)
    }
}



//After creating a new CP ,then its data is sending to Nodal to add this CP under that Nodal
const addCpToNodal = (data: any) => {
    try {
        const queue = `add-new-cp`
        publisher(queue, data)
    } catch (error) {
        console.log(error)
    }
}

export default {
    addCpToNodal
}

