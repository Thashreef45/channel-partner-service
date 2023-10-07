import repository from "../../infrastructure/repositories/repository"


const bookingToFdm = (id:string,prefix:string,awb:string) => {
    const fullAwb = prefix+awb
    repository.bookingToFdm(id,fullAwb)
}

export default bookingToFdm