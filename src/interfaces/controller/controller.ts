import cpData from '../../application/usecase/get-data'
import findByPincode from '../../application/usecase/findby-pincode'
import findById from '../../application/usecase/findby-id'
import ValidateAwb from '../../application/usecase/validate-awb'

export default {

    cpdata: async (call:any,callback:any) => {
        try {
            const data =await cpData(call.request.id)
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

    searchById : async (call:any,callback:any) => {
        try {
            const response = await findById(call.request.id)
            callback(null,response)
        } catch (error) {
            console.log(error)
        }
    },

    validateAwb : async (call:any,callback:any) => {
        try {
            const response = await ValidateAwb(call.request)
            callback(null,response)
        } catch (error) {
            console.log(error)
        }
    }
}