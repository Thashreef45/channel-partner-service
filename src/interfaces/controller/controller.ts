import cpData from '../../application/usecase/get-data'
import findByPincode from '../../application/usecase/findby-pincode'
import findById from '../../application/usecase/findby-id'
import ValidateAwb from '../../application/usecase/validate-awb'
import { CpdataCall, GrpcCallBack, SearchById, SearchByPinCall, ValidateAwbCall } from '../types/interfaces'
import login from '../../application/usecase/login'
import createCP from '../../application/usecase/create-cp'
import getEmployees from '../../application/usecase/get-employees'
import CreateNewEmployee from '../../application/usecase/add-new-employee'
import getFdmDetails from '../../application/usecase/get-cp-fdms'
import setFdmToNodal from '../../application/usecase/assign-fdm-nodal'

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

    getCpEmployees : async (call:any,callback:GrpcCallBack)=>{
        try {
            const response = await getEmployees(call.request.token)
            callback(null,response)
        } catch (error) {
            
        }
    },

    CreateNewEmployee : async (call:any,callback:GrpcCallBack) => {
        try {
            const response = await CreateNewEmployee(call.request)
            callback(null,response)
        } catch (error) {
            
        }
    },

    getCpFdmDetails : async (call:any,callback:GrpcCallBack)=> {
        try {
            const response =  await getFdmDetails(call.request.token)
            callback(null,response)
        } catch (error) {
            
        }
    },

    assignFdmtoNodal : async(call:any,callback:GrpcCallBack) => {
        try {
            const response = await setFdmToNodal(call.request)
            callback(null,response)
        } catch (error) {
            
        }
    }

}