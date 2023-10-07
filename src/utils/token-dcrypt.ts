import { verify } from "jsonwebtoken"

const decryptToken = (token: string) => {    
    let id
    token = token.split(" ")[1]
    const jwtSignature = String(process.env.JWT_SIGNATURE)
    let verified = verify(token, jwtSignature)
    if (typeof verified == 'object') {
        id = verified.id
    }
    return id
}

export default decryptToken