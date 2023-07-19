import { Schema, model } from 'mongoose'

const cpModel: Schema = new Schema({
  address: {
    pincode: Number,
    address: String
  },
  nodalPoint: String,
  apex:String,
  employee: Array,
  phone: Number,
  email: String,
  password:String,
  fdm: Array
})

const Model = model('channel-partner', cpModel)
export default Model
