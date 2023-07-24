import { hash } from "bcrypt"
import repository from "../../infrastructure/repositories/repository"

const createCP = async (data: any) => {
    try {
        const cpIdExist = await repository.getCpData(data.id)
        const cpPinExist = await repository.findByPin(data.address.pincode)
        if (!cpIdExist && !cpPinExist) {
            data.password = await hash(data.password, 10)
            const response = await repository.createCP(data)
            return { message: 'success', cp: response }
        } return { message: 'CP already exist' }
    } catch (error) {
        console.log(error)
    }
}

export default createCP