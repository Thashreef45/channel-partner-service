import repository from "../../infrastructure/repositories/repository"
import { config } from "dotenv"
import decryptToken from "../../utils/token-dcrypt"
config()

const getEmployees = async(token:string) => {
    const id = String(decryptToken(token))
    
    const data = await repository.getCpEmployees(id)
    if(data){
        return {status:200,employees:data[0].employee}
    }
}

export default getEmployees

