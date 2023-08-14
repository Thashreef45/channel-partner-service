// import * as amqp from 'amqplib'
// const Url = 'amqp://localhost:5672'


// const consumer = async(queue:string) => {
//     try {
//         const queue = 'add-consignments'

//         const connection = await amqp.connect(Url)
//         const channel = await connection.createChannel()
//         await channel.assertQueue(queue)
//         channel.consume(queue, (data: any) => {
//             channel.ack(data)
//             data?.content.toString()
//         })
//     } catch (error) {
//         console.log(error)
//     }

// }

// export default {
//     //recieving purchased consignments
//     addConsignments: async () => {
//         try {
            
//         } catch (error) {
//             console.log(error)
//         }
//     }
// }




