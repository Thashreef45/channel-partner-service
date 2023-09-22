import repository from "../../infrastructure/repositories/repository"
import { config } from "dotenv"
import decryptToken from "../../utils/token-dcrypt"
config()

const getEmployees = async(token:string) => {
    const id = decryptToken(token)
    
    const data = await repository.getCpEmployees(id)
    if(data){
        return {status:200,employees:data.employee}
    }
}

export default getEmployees

