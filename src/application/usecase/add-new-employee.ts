import repository from "../../infrastructure/repositories/repository"
import decryptToken from "../../utils/token-dcrypt"

const CreateNewEmployee = async(data:any) => {
    try {
        const id = decryptToken(data.token)
        if(!id){
            return {message:'Token verification failed',status:401}
        }

        const employee = {
            name : data.name,
            email : data.email,
            phone : Number(data.phone)
        }
        const response = await repository.addEmployee(id,employee)
        if(response){
            return {message:'success',status:201}
        }return {message:'CP not found',status:404}
        
        
    } catch (error) {
        
    }
}




export default CreateNewEmployee