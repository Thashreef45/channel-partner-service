import express,{Application,Request,Response} from 'express'
import controller from '../interfaces/controller/controller'
import tokenCheck from '../middleware/token-authentication'
import nodalCheck from '../middleware/nodal-auth'

const route: Application = express()

route.post('/create-cp',nodalCheck,controller.createCP)
route.post('/login', controller.login)
route.get('/home',tokenCheck,controller.cpData)

export default route