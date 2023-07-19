import express,{Application,Request,Response} from 'express'
import controller from '../interfaces/controller/controller'
import tokenCheck from '../middleware/token-authentication'
const route: Application = express()

route.get('/', (req: Request, res: Response) => res.json({ welcome: 'channel-partner-service' }))
route.post('/login', controller.login)
route.get('/home',tokenCheck,controller.cpData)

export default route