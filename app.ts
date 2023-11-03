import express, { Application } from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import compression from 'compression';
import logger from 'morgan';
import cors from 'cors';
import env from 'dotenv';
import grpcServer from './src/interfaces/grpc-config/grpc-server';
import addConsignments from './src/application/events/consumers/assign-consignments';
import removeAwb from './src/application/events/consumers/remove-booked-awb';
import resetAwb from './src/application/events/consumers/reset-awb';
import getCpDetailsReq from './src/application/events/consumers/get-cp-details-req';
import recieveFdm from './src/application/events/consumers/recieve-fdm';
import getCpDetailsToApex from './src/application/events/consumers/get-cp-details-apex';
import removeRecievedFdm from './src/application/events/consumers/remove-recieved-fdm';


class nodeApp {
  public app: Application

  constructor() {
    env.config()
    this.app = express()
    this.initialiseMiddleware()
    this.initiliseGatewayListner()
    this.messageConsumers()
  }

  private initialiseMiddleware(): void {
    this.app.use(cors())
    this.app.use(helmet());
    this.app.use(nocache())
    this.app.use(compression())
    this.app.use(logger('dev'))
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false }));
  }

  private messageConsumers(){
    addConsignments()
    removeAwb()
    resetAwb()
    getCpDetailsReq()
    recieveFdm()
    getCpDetailsToApex()
    removeRecievedFdm()
  }

  private initiliseGatewayListner(): void {
    grpcServer()
  }

  public listen(port:string): void {
    this.app.listen(process.env.PORT, () => console.log('channel-partner service is running at',port))
  }
}


export default nodeApp