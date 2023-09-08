import repository from "../../infrastructure/repositories/repository"
import { verify } from "jsonwebtoken"

const cpData = async (id: string) => {
    try {

        const jwtSignature = String(process.env.JWT_SIGNATURE)
        let token  = id.split(" ")[1]
        const verifiedId = verify(token, jwtSignature)

        if(typeof verifiedId == 'object'){
            id = verifiedId.id
        }

        const data = await repository.getCpData(id)
        if (data) {
            data.message = 'success'
            data.status = 200
            return data
        } else {
            return {
                message: 'Channel-partner not found',
                status: 404
            }
        }
    } catch (error) {
        console.log(error)
    }
}

export default cpData