import { hash } from "bcrypt"
import repository from "../../infrastructure/repositories/repository"
import { verify } from "jsonwebtoken"
import { config } from "dotenv"
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

            // const updateNodal = await Nodalrepository.setCreatedCP(data.id, data.nodalPoint)
            //code which update new cp in nodal 

            if(response){
                return { message: 'success', status: 200 }
            }else{
                return {message: 'CP creation failed', status: 500 }
            }
        }return { message: 'CP already exist', status: 409 }
    } catch (error) {
        console.log(error)
    }
}

const decryptToken = (token: string) => {
    let id
    token = token.split(" ")[1]
    const jwtSignature = String(process.env.JWT_SIGNATURE)
    let verified = verify(token, jwtSignature)
    if (typeof verified == 'object') {
        id = verified.id
    }
    return id
}

export default createCP