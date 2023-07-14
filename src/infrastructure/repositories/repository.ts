import connectDB from "../../utils/dbConnection";
import Model from "../../domain/entities/cp-model";
connectDB()

export default {
    cpLogin : async(id:string) =>{
        return await Model.findOne({id:id})
    },
}
