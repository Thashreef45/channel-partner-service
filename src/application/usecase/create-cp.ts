import { hash } from "bcrypt"
import repository from "../../infrastructure/repositories/repository"
import { config } from "dotenv"
import publisher from "../events/publisher/publisher"
import decryptToken from "../../utils/token-dcrypt"
config()

const createCP = async (data: any) => {
    try {
        data.phone = Number(data.phone)
        data.nodalPoint = decryptToken(data.token)

        const cpIdExist = await repository.findById(data.id)
        const cpPinExist = await repository.findByPin(data.pincode)

        if (!cpIdExist && !cpPinExist) {
            data.password = await hash(data.password, 10)
            const response = await repository.createCP(data)

            if (response) {

                // update new cp in nodalDB
                publisher.addCpToNodal({cpId:data.id,nodalId:data.nodalPoint})

                return { message: 'success', status: 200 }

            } else {
                return { message: 'CP creation failed', status: 500 }
            }

        } return { message: 'CP already exist', status: 409 }
        
    } catch (error) {
        console.log(error)
    }
}


export default createCP