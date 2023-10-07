import decryptToken from "../../utils/token-dcrypt"
import repository from "../../infrastructure/repositories/repository"

const getFdmDetails = async (token: string) => {
    try {
        const nodalId = decryptToken(token)
        const data = await repository.getFdmDetails(nodalId)        
        return {status:200,data:data}
    } catch (error) {
        return {status:400}
    }
}

export default getFdmDetails