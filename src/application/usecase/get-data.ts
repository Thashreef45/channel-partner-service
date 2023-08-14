import repository from "../../infrastructure/repositories/repository"
import { verify } from "jsonwebtoken"

const cpData = async (id: string) => {
    try {
        const data = await repository.getCpData(id)
        if(data) {
            data.message = 'success'
            data.status = 200
            return data
        }else{
            return {
                message : 'Channel-partner not found',
                status : 404
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default cpData