/**
 * this file will update in the patch use-case for user domain
 */
/**
 * function for update user first look for it then update it .
 */
const { User } = require('src/domain/user')
/**
 * function for update user.
 */
module.exports = ({ userRepository }) => {
  // code for update a item
  const update = ({ id, body }) => {
    return Promise.resolve()
      .then(() => {
        if (!body) {
          throw new Error('Incorrect body on request')
        }
        return userRepository.findById(id)
          .then(entity => {
            const _id = entity._id
            const entityCustom = Object.assign({}, body, { _id })
            const user = User(entityCustom)
            return userRepository.update(user)
          })
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    update
  }
}
