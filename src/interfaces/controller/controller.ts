import cpData from '../../application/usecase/get-data'
import findByPincode from '../../application/usecase/findby-pincode'
import findById from '../../application/usecase/findby-id'
import ValidateAwb from '../../application/usecase/validate-awb'
import { CpdataCall, GrpcCallBack, SearchById, SearchByPinCall, ValidateAwbCall } from '../types/interfaces'
import login from '../../application/usecase/login'
import createCP from '../../application/usecase/create-cp'

export default {

    cpLogin : async(call:any,callback:GrpcCallBack) => {
        const response = await login(call.request)
        callback(null,response)
    },

    createCp : async(call:any,callback:GrpcCallBack) =>{
        const response  = await createCP(call.request)
        callback(null,response)
    },

    cpdata: async (call:CpdataCall,callback:GrpcCallBack) => {
        try {
            const data = await cpData(call.request.id)
            callback(null,data)
        } catch (error) {
            console.log(error)
        }
    },

    searchByPincode: async (call:SearchByPinCall,callback:GrpcCallBack) => {
        try {
            const response = await findByPincode(call.request.pincode)
            callback(null,response)
        } catch (error) {
            console.log(error)
        }
    },

    searchById : async (call:SearchById,callback:GrpcCallBack) => {
        try {
            const response = await findById(call.request.id)
            callback(null,response)
        } catch (error) {
            console.log(error)
        }
    },

    validateAwb : async (call:ValidateAwbCall,callback:GrpcCallBack) => {
        try {
            const response = await ValidateAwb(call.request)
            callback(null,response)
        } catch (error) {
            console.log(error)
        }
    },


}