const User = require('./user')
module.exports = ({ database }) => {
  console.log('DaTaBase', database.model('user'))
  const UserModel = database.model('user')
  return {
    userRepository: User({ model: UserModel })
  }
}
