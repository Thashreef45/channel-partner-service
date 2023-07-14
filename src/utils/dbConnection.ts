import {connect} from "mongoose"
import {config} from "dotenv";
config();

function connectDB() {
    const dbConnection = String(process.env.DB_CONNECTION)
    connect(dbConnection).then(() =>
      console.log('cp-service-db-connected')
    );
  }
  

export default connectDB