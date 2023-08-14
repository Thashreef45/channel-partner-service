import repository from "../../infrastructure/repositories/repository"


const findByPincode = async (pin: number) => {
    try {
        const cpExist = await repository.findByPin(pin)
        if (cpExist){
            cpExist.message ='success'
            cpExist.status=200
            return cpExist
        } 
        else return { message: 'No CP exist in this pincode',status:404}
    } catch (error) {
        console.log(error)
    }
}

export default findByPincode

