const dynamoose = require('dynamoose')

const userSchema = new dynamoose.Schema({
  _id: String,
  names: String,
  lastName: String,
  type: String,
  identification: String,
  age: Number,
  city: String,
  imageUrl: String
}, {
  saveUnknown: true,
  timestamps: true
})
module.exports = dynamoose.model('user', userSchema)
