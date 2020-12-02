const dynamoose = require('dynamoose')
const { v4: uuidv4 } = require('uuid')
const userSchema = new dynamoose.Schema({
  _id: {
    type: String,
    default: () => uuidv4(),
    required: true
  },
  names: String,
  lastName: String,
  type: String,
  age: Number,
  city: String,
  imageUrl: String
}, {
  saveUnknown: false,
  timestamps: true
})
module.exports = dynamoose.model('user', userSchema)
