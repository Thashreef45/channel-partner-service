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
        return await Model.findOne({'address.pincode':pin},{password:0,fdm:0,employee:0})
    },
    createCP : async(data:{pincode: Number,address: String,nodalPoint: String,phone: Number,email: String,password:String,apex:String,}) =>{
        const {address,pincode , nodalPoint , apex , phone , email , password} = data
        const newCP = new Model({
            address:{
                address:address,
                pincode : pincode
            },nodalPoint , apex , phone , email , password
        })
        newCP.save()
        return data
    }

} 
