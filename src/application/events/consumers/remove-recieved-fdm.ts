import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository'
config()

const removeRecievedFdm = async () => {
    try {
        const queue = 'remove-recieved-awb'
        const connection = await amqp.connect(String(process.env.RabbitMq_PORT))
        const channel = await connection.createChannel()
        await channel.assertQueue(queue)
        channel.consume(queue, (data: any) => {
            channel.ack(data)
            execute(data?.content.toString())
        })
    } catch (error) {
        console.log(error)
    }
}


const execute = async (data: any) => {
    data = JSON.parse(data)
    await repository.removeFromRecievedQueueByPincode(data)
}

export default removeRecievedFdm