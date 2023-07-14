import { type Request, type Response } from 'express'
import { cpLogin } from '../../application/usecase/login'
import { hash } from 'bcrypt'

export default{
    login:async(req:Request,res:Response) => {
        const response = await cpLogin(req.body)
        if(response.message == "success"){
            res.status(200).json(response)
        }else res.status(401).json(response)
    }
}