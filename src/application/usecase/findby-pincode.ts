import repository from "../../infrastructure/repositories/repository"


const findByPincode = async (pin:number) => {
    const cpExist = await repository.findByPin(pin)
    if(cpExist) return {
        message:'success',
        cp:cpExist
    }
    else{
        return{message:'No CP exist in this pincode'}
    }
}

export default findByPincode

