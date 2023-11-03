import { Schema, model } from 'mongoose'

const cpModel: Schema = new Schema({

  id: String,
  pincode: Number,
  address: String,
  name: String,
  phone: Number,
  email: String,
  nodalPoint: String,
  consignmentPrefix: String,
  employee: [
    {
      name:String,
      email:String,
      phone:Number,
      isWorking:{
        type:Boolean,
        default:true
      }
    }
  ],
  consignments: {
    normal: [Number],
    WE: [Number],
    PR: [Number]
  },
  password: String,
  fdm: {
    sending: {
      type: [String],
      default: [],
    },
    recieved: {
      type: [String],
      default: [],
    },
  }
  
})


const Model = model('channel-partner', cpModel)
export default Model



