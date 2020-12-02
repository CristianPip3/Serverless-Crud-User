const User = require('./user')
module.exports = ({ database }) => {
  const UserModel = database.model('user')
  return {
    userRepository: User({ model: UserModel })
  }
}
