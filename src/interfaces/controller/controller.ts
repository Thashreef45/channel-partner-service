import { type Request, type Response } from 'express'
import cpData from '../../application/usecase/get-data'
import findByPincode from '../../application/usecase/findby-pincode'

export default {

    cpdata: async (call:any,callback:any) => {
        try {
            const data =await cpData(call.request.id)
            console.log('!!!data ',data)
            callback(null,data)
        } catch (error) {
            console.log(error)
        }
    },

    searchByPincode: async (call:any,callback:any) => {
        try {
            const response = await findByPincode(call.request.pincode)
            callback(null,response)
        } catch (error) {
            console.log(error)
        }
    },
}