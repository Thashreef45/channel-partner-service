import connectDB from "../../utils/dbConnection";
import Model from "../../domain/entities/cp-model";
connectDB()

export default {

    createCP : async(data:any) =>{
        const newCP = new Model({
            id:data.id,
            address:data.address,
            pincode:data.pincode,
            nodalPoint:data.nodalPoint ,
            phone:data.phone, 
            email:data.email, 
            password:data.password,
            consignmentPrefix:data.consignmentPrefix
        })
        return await newCP.save()
    },

    cpLogin : async(id:string) =>{
        return await Model.findOne({id:id})
    },

    getCpData : async(id:string) =>{
        return await Model.findOne({id:id},{password:0,fdm:0,employee:0,nodalPoints:0})
    },

    findByPin :async (pin:number) => {
        return await Model.findOne({pincode:pin},{password:0,fdm:0,employee:0,consignments:0})
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
    },

    //remove used awb after bookin
    removeAwb : async(cpId:string,prefix:string,awbNumber:number)=>{
        const consignments:any = {}
        const key:string = "consignments." + prefix
        consignments[key] = awbNumber
        
        await Model.updateOne({id:cpId},{$pull:consignments})
    },

    getCpEmployees :async (id:string) => {
        return await Model.findOne({id:id},{_id:0,employee:1})
    },

    addEmployee : async (id:string,data:any) => {
        
        return await Model.updateOne({id},{$push:{employee:data}})
    }

} 
