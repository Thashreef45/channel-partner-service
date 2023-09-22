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
  apex: String,
  employee: [
    {
      name:String,
      email:String,
      phone:Number
    }
  ],
  consignments: {
    normal: [Number],
    WE: [Number],
    PR: [Number]
  },
  password: String,
  fdm: {
    sending :[
      {consignmentId:String}
    ],
    recieved : [
      {consignmentId:String}
    ]
  }
})

const Model = model('channel-partner', cpModel)
export default Model
