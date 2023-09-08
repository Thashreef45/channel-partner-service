import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository'
config()

const removeAwb = async() => {
    try {
        const queue = 'remove-awb'
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


const execute = (data:any) => {
    data = JSON.parse(data)
    if(data.awbPrefix !== 'PR' && data.awbPrefix !== "WE"){
        console.log(data.awbPrefix,'prefix here',data,'<<')
        data.awbPrefix = 'normal'
    }
    repository.removeAwb(data.cpId,data.awbPrefix,data.awb)
}

export default removeAwb