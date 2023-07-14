import { Request,Response,NextFunction } from "express"
import { verify } from "jsonwebtoken"

const tokenCheck = (req:Request ,res:Response,next:NextFunction) =>{
    const {cpToken} = req.headers
    if(cpToken){
        let token: string;
        if (Array.isArray(cpToken)) {
          token = cpToken[0].split(" ")[1];
        } else {
          token = cpToken.split(" ")[1];
        }
        if(verify(token,String(process.env.JWT_SIGNATURE)))next()
        else res.status(401).json({message:"invalid-token"})
    }else{
        res.status(401).json({message:"required jwt-token"})
    }
}