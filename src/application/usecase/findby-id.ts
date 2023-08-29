import repository from "../../infrastructure/repositories/repository"


const findById = async (id: string) => {
    try {
        const cpExist = await repository.findById(id)
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

export default findById

