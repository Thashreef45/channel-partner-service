import { type Request, type Response } from 'express'
import { cpLogin } from '../../application/usecase/login'
import { cpData } from '../../application/usecase/get-data'
import findByPincode from '../../application/usecase/findby-pincode'
import createCP from '../../application/usecase/create-cp'

export default {

    login: async (req: Request, res: Response) => {
        try {
            const response = await cpLogin(req.body)
            if (response.message == "success") {
                res.status(200).json(response)
            } else res.status(401).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    cpData: async (req: Request, res: Response) => {
        try {
            let response
            if (typeof req.headers.key === 'string') {
                response = await cpData(req.headers.key)
            }
        } catch (error) {
            console.log(error)
        }
    },

    searchByPincode: async (req: Request, res: Response) => {
        try {
            const response = await findByPincode(req.body.pincode)
            if(typeof response !='undefined' && response.message == 'success') res.status(200).json(response)
            else res.status(404).json(response)
        } catch (error) {
            console.log(error)
        }
    },

    createCP : async (req:Request,res:Response) => {
        try {
            const response = await createCP(req.body)
            if(typeof response !='undefined' && response.message == 'success') res.status(201).json(response)
            else res.status(409).json(response)
        } catch (error) {
            console.log(error)
        }
    },



}