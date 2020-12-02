/**
 * this file will create in the post use-case for user domain
 */
const { User } = require('src/domain/user')

/**
 * function for create user.
 */
module.exports = ({ userRepository }) => {
  // code for create a item
  const create = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        const user = User(body)
        return userRepository.create(user)
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
