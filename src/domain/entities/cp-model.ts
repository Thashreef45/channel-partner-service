import { Schema, model } from 'mongoose'

const cpModel: Schema = new Schema({
  address: {
    pincode: Number,
    address: String
  },
  nodalPoint: String,
  consignmentPrefix:String,
  apex:String,
  employee: Array,
  consignments : {
    normal:[Number],
    WE:[Number],
    PR:[Number]
  },
  id:String,
  name:String,
  phone: Number,
  email: String,
  password:String,
  fdm: Array
})

const Model = model('channel-partner', cpModel)
export default Model
