import { verify } from "jsonwebtoken"
import repository from "../../infrastructure/repositories/repository"
import { config } from "dotenv"
config()


const getAnEmployee = async (data: { id: string, token: string }) => {
    try {
        const cpId: string = String(decodedToken(data.token))
        if (cpId) {
            const response = await repository.getAnEmployee(data.id, cpId)
            return {status:200,data:response[0]}
        }
    } catch (error) {
        return { status: 400, message: 'Failed fetch employee data' }
    }
}


export default getAnEmployee


const decodedToken = (token: string): string | undefined => {
    const jwtSignature = String(process.env.JWT_SIGNATURE);
    token = token.split(" ")[1];
    const id = verify(token, jwtSignature)
    if (typeof id == "object" && id?.id) return String(id.id)
}