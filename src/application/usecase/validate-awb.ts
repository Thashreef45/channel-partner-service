import repository from "../../infrastructure/repositories/repository"



const ValidateAwb = async (data: any) => {
    const cpExist = await repository.findById(data.cpId)
    if (!cpExist) {
        return {message:'Unable to find CP',status:404}
    }else{
        const prefix = data.awb.slice(0,2)
        const stringAwb:string = data.awb.slice(2,data.awb.length)
        const awb = Number(stringAwb)

        if(isNaN(awb)){
            return {message:'Invalid AWB',status:400}
        }

        if(prefix == "PR" || prefix == "WE"){


            let CheckPrefix:any = await repository.getCpData(data.cpId)
            if(!CheckPrefix.consignments[prefix]){
                return {message:'Invalid AWB',status:400}
            }else{
                const isAwbExist = repository.isAwbExist(data.cpId,data.prefix,awb)
                if(!isAwbExist){
                    return {message:'Invalid AWB',status:400}
                }
            }


        }else{
            let CheckPrefix:any = await repository.getCpData(data.cpId)
            if(CheckPrefix.consignmentPrefix != prefix){
                return {message:'Invalid AWB',status:400}
            }else{
                const isAwbExist = repository.isAwbExist(data.cpId,'normal',awb)
                if(!isAwbExist){
                    return {message:'Invalid AWB',status:400}
                }
            }
        }
    }
}

export default ValidateAwb