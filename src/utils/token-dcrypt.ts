import { verify } from "jsonwebtoken"
import { config } from "dotenv";
config()


const decodedToken = (token:string):string => {
    const jwtSignature = String(process.env.JWT_SIGNATURE);
    let id = null;
    token = token.split(" ")[1];
    try {
        const decodedToken = verify(token, jwtSignature);
        if (typeof decodedToken === "object" && decodedToken?.id) {
            id = decodedToken.id;
        }
    } catch (error) {
        console.error("Token verification failed:", error);
    }
    return String(id)
}



export default decodedToken