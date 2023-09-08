import { sign } from 'jsonwebtoken'
import { compare } from 'bcrypt'
import repository from '../../infrastructure/repositories/repository'



const login = async ( data:{id:string, password:string}) => {
    try {
        const {id,password} = data
        return await validateLogin(id,password)
    } catch (error) {
        console.log(error)
    }
}



const validateLogin = async(id:string,password:string) => {
    const cpExist = await repository.cpLogin(id)
    if (cpExist) {
        if (await compare(password, cpExist.password)) {
            return { message: "success", token: sign({ id: id, administration: "channelPartner" }, String(process.env.JWT_SIGNATURE), { expiresIn: '24h' }), status: 200 }
        } else {
            return { message: "Wrong password", status: 401 }
        }
    } else {
        return { message: "CP not exist", status: 404 }
    }
}

export default login
