import express,{Application,Request,Response} from 'express'
import controller from '../interfaces/controller/controller'

const route: Application = express()

route.get('/', (req: Request, res: Response) => res.json({ welcome: 'channel-partner-service' }))
route.post('/login', controller.login)

export default route