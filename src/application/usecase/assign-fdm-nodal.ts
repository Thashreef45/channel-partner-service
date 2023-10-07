import decryptToken from "../../utils/token-dcrypt"
import repository from "../../infrastructure/repositories/repository"
import publisher from "../events/publisher/publisher"


const setFdmToNodal = async (data: { token: string, id: string,address:string,name:string }) => {
    const nodalId = decryptToken(data.token)
    const fdmData = await repository.getFdmByCp(nodalId, data.id)
    let fdm
    if (fdmData) {
        fdm = fdmData.fdm.sending
    }

    //transfering fdm to nodalPoint
    publisher.SendFdmToNodal({data:fdm,nodalId:nodalId,address:data.address,name:data.name})

    await repository.removeSendingFdms(nodalId,data.id)

    return {status:200,message:'success'}
}

export default setFdmToNodal