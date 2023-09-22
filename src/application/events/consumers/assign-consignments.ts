import * as amqp from 'amqplib'
import { config } from 'dotenv'
import repository from '../../../infrastructure/repositories/repository'
config()

const addConsignments = async() => {
    try {
        const queue = 'buy-awb'
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

export default addConsignments





const execute = async(data:any) => {
    let Data = JSON.parse(data)
    let purchasedAwbs = await repository.getCpAwb(Data.id)
    if( (Data.awbPrefix == "WE" || Data.awbPrefix == "PR")  && purchasedAwbs){
        if(Data.awbPrefix == "PR"){
                assignAWb(purchasedAwbs.consignments.PR,
                Data.awbPrefix,Data.awbAvailability,Data.quantity)
                repository.assignAwb(Data.id,purchasedAwbs.consignments)
                // return 
        }else{
                assignAWb(purchasedAwbs.consignments.WE,
                Data.awbPrefix,Data.awbAvailability,Data.quantity)
                repository.assignAwb(Data.id,purchasedAwbs.consignments)
                // return 
        }
        
    }
    else if(purchasedAwbs){
            assignAWb(purchasedAwbs.consignments.normal,
            Data.awbPrefix,Data.awbAvailability+1,Data.quantity)
            repository.assignAwb(Data.id,purchasedAwbs.consignments)
            // return
    }
}


const assignAWb = (arr:number[],prefix:string,start:number,end:number)=>{
    for(let i = start ; i <end+start ; i++){
        arr.push(i)
    }
}



