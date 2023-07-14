import repository from '../../infrastructure/repositories/repository'
import {sign} from 'jsonwebtoken'
import {hash,compare} from 'bcrypt'


export const cpLogin = async(data:any): Promise<{message:string;token?:string;}> =>{
    const {id,password} = data
    const cpExist = await repository.cpLogin(id)
    if(cpExist){
        if(await compare(password,cpExist.password)){
            return {message:"success",token:sign({id:id},String(process.env.JWT_SIGNATURE))}
        }
        return {message:"wrong password"}
    }return {message:"cp not exist"}
}

