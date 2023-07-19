import repository from "../../infrastructure/repositories/repository"
import { verify } from "jsonwebtoken"

export const cpData = async (id: string) => {
    try {
        id = id.split(" ")[1]
        const encKey = verify(String(id), String(process.env.JWT_SIGNATURE))
        if (typeof encKey != 'string') id = encKey.id
        return await repository.getCpData(id)
    } catch (error) {
        console.log(error)
    }
}