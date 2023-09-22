import repository from "../../infrastructure/repositories/repository"
import decryptToken from "../../utils/token-dcrypt"


const ValidateAwb = async (data: any) => {

    const id = decryptToken(data.token)
    const cpExist = await repository.findById(id)
    if (!cpExist) {
        return { message: 'Unable to find CP', status: 404 }
    } else {
        data.cpId = id
        return await excuteValidation(data)
    }
}

export default ValidateAwb



const excuteValidation = async (data: any) => {
    const prefix = data.awb.slice(0, 2)
    const stringAwb: string = data.awb.slice(2, data.awb.length)
    const awb = Number(stringAwb)
    if (isNaN(awb)) {
        return { message: 'Invalid AWB', status: 400 }
    }

    if (prefix == "PR" || prefix == "WE") {
        return await specialConsignmentValidation(data, prefix, awb)
    } else {
        return await normalConsignmentValidation(data, prefix, awb)
    }
}

const normalConsignmentValidation = async (data: any, prefix: string, awb: number) => {
    let CheckPrefix: any = await repository.getCpData(data.cpId)
    if (CheckPrefix.consignmentPrefix != prefix) {
        return { message: 'Invalid AWB', status: 400 }
    } else {
        return await validateAwbExistence(data,prefix,awb)
    }
}

const specialConsignmentValidation = async (data: any, prefix: string, awb: number) => {
    let CheckPrefix: any = await repository.getCpData(data.cpId)
    if (!CheckPrefix.consignments[prefix]) {
        return { message: 'Invalid AWB', status: 400 }
    } else {
        return await validateAwbExistence(data,prefix,awb)
    }
}




const validateAwbExistence = async(data:any,prefix:string,awb:number) => {
    const isAwbExist = await repository.isAwbExist(data.cpId, prefix, awb)
    if (!isAwbExist) {
        return { message: 'Invalid AWB', status: 400 }
    } else {
        return { message: 'Valid AWB', status: 200 }
    }
} 


