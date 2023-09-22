import * as grpc from '@grpc/grpc-js'
import * as protoLoader from '@grpc/proto-loader'
import { config } from 'dotenv'
import controller from '../controller/controller'


config()
const packageDef = protoLoader.loadSync('/home/thashreef/Brototype/express-link/server/microservices/channel-partner/src/interfaces/grpc-config/cp.proto')
const grpcObject = grpc.loadPackageDefinition(packageDef)
const cpPackage:any = grpcObject.cpPackage;

const server = new grpc.Server()

const grpcServer = () => {
    server.bindAsync(String(process.env.GATE_WAY_PORT),
        grpc.ServerCredentials.createInsecure(),
        (err, port) => {
            if (!err) {
                server.start()
                console.log(`gRPC server is running at Port:`, port)
            }
        }
    )
}


server.addService(cpPackage.cpService.service,{
    "createCP":controller.createCp,
    "Login":controller.cpLogin,
    "Home" : controller.cpdata,
    "searchByPin" : controller.searchByPincode,
    "searchById": controller.searchById,
    "validateAwb" : controller.validateAwb,
    "getEmployees":controller.getCpEmployees,
    "createEmployee":controller.CreateNewEmployee,
})


export default grpcServer