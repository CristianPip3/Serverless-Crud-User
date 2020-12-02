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
  saveUnknown: false,
  timestamps: true
})

const UserModel = dynamoose.model('user', userSchema)
UserModel.methods.set('allRegister', async function () {
  let results = await this.scan().exec()
  let lastKey = results.lastKey
  do {
    const newResult = await this.scan().startAt(lastKey).exec()
    results = [...results, ...newResult]
    lastKey = newResult.lastKey
  } while (lastKey)
  return results
})
module.exports = UserModel
