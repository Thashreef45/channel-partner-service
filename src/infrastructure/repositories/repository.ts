import connectDB from "../../utils/dbConnection";
import Model from "../../domain/entities/cp-model";
connectDB()

export default {
    cpLogin : async(id:string) =>{
        return await Model.findOne({id:id})
    },

    getCpData : async(id:string) =>{
        return await Model.findOne({id:id},{password:0,fdm:0,employee:0,nodalPoints:0})
    },

    findByPin :async (pin:number) => {
        return await Model.findOne({'address.pincode':pin},{password:0,fdm:0,employee:0,consignments:0})
    },

    findById :async (id:string) => {
        return await Model.findOne({id:id},{password:0,fdm:0,employee:0,consignments:0})
    },

    assignAwb : async(id:string,data:any) => {
        return Model.updateOne({id:id},{$set:{consignments:data}})
    },

    getCpAwb : async(id:string) => {
        return await Model.findOne({id:id},{consignments:1 ,_id:0})
    },

    isAwbExist : async(cpId:string,prefix:string,awbNumber:number) =>{
        return await Model.findOne({id:cpId,[`consignments.${prefix}`]:{$in:[awbNumber]}},{password:0,fdm:0,employee:0,consignments:0})
    }


} 
