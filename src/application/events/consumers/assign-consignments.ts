import * as amqp from 'amqplib'
const Url = 'amqp://localhost:5672'
import repository from '../../../infrastructure/repositories/repository'


const addConsignments = async() => {
    try {
        console.log('consumer work aayi')
        const queue = 'add-consignments'
        const connection = await amqp.connect(Url)
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

    if(Data.consignment.length == 1){
        let response = await repository.getCpAwb(Data.cpId)
        console.log(response,"&&&--&&",Data.consignment[0].prefix)
        if(Data.consignment[0].prefix != 'PR' && Data.consignment[0].prefix != 'WE'){
            if(response){
                let arr = response.consignments.normal
                let resData = assignAWb(arr,'normal',Data.consignment[0].awbAvailabilty,Data.count[0]) 
                response.consignments.normal = resData
                console.log(response.consignments,'resssssponssse000')
                let updated = await repository.assignAwb(Data.cpId,response.consignments)
                console.log('retu',updated,'__==')
            }
        }else{
            // if()
        }
        
    }
    else if(Data.consignment.length == 2){
        let response = await repository.getCpAwb(Data.cpId)
        console.log(response,"&&&++++&&",Data) 

    }
    else {
        console.log('3')
    }
}


const assignAWb = (arr:number[],prefix:string,start:number,end:number)=>{
    for(let i = start ; i < end+start ; i++){
        arr.push(i)
    }
    return arr
}



