import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository'
config()

const resetAwb = async () => {
    try {
        const queue = 'reset-awb'
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
    if (data.prefix != "PR" && data.prefix != "WE") data.prefix = 'normal'

    await repository.removeRecentbooking(data.id, data.prefix + data.awb)
    await repository.resestAwb(data)
}

export default resetAwb