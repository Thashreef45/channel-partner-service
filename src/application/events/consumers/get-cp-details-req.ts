import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository';
config()


const queue = 'cp-details-to-nodal'
const URL = String(process.env.RabbitMq_PORT)


const getCpDetailsReq = async () => {
    const connection = await amqp.connect(URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(queue)
    channel.consume(queue, async(data: any) => {
        const cpData = await executeResponse(data?.content.toString())
        if(cpData){
            channel.sendToQueue(
                data.properties.replyTo,
                Buffer.from(JSON.stringify(cpData)),
                { correlationId: data.properties.correlationId }
            );    
        }
        channel.ack(data)
    })
}

export default getCpDetailsReq

const executeResponse = async(data: any) => {
    data = JSON.parse(data)
    let response:any = await repository.findByPin(data.pin)
    return {id:response.id,address:response.address,name:response.name}
}