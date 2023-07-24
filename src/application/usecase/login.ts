import repository from '../../infrastructure/repositories/repository'
import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'


export const cpLogin = async (data: any): Promise<{ message: string; token?: string; }> => {
    try {
        const { id, password } = data
        const cpExist = await repository.cpLogin(id)
        if (cpExist) {
            if (await compare(password, cpExist.password)) {
                return { message: "success", token: sign({ id: id ,administration:"channelPartner"}, String(process.env.JWT_SIGNATURE), { expiresIn: '24h' }) }
            }
            return { message: "wrong password" }
        } return { message: "CP not exist" }
    } catch (error) {
        console.log(error)
        throw error
    }
}

