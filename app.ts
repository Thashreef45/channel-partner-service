import express, { Application } from 'express';
import helmet from 'helmet';
import nocache from 'nocache';
import compression from 'compression';
import logger from 'morgan';
import cors from 'cors';
import env from 'dotenv';
import grpcServer from './src/interfaces/grpc-config/grpc-server';


class nodeApp {
  public app: Application

  constructor() {
    env.config()
    this.app = express()
    this.initialiseMiddleware()
    this.initiliseGatewayListner()
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

  private initiliseGatewayListner(): void {
    grpcServer()
  }

  public listen(port:string): void {
    this.app.listen(process.env.PORT, () => console.log('channel-partner service is running at',port))
  }
}


export default nodeApp