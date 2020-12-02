/**
 * this file will create in the post use-case for user domain
 */
const { User } = require('src/domain/user')
const { v4: uuidv4 } = require('uuid')
/**
 * function for create user.
 */
module.exports = ({ userRepository }) => {
  // code for create a item
  const create = ({ body }) => {
    return Promise.resolve()
      .then(() => {
        const _id = uuidv4()
        const entity = Object.assign({}, body, { _id })
        const user = User(entity)
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
