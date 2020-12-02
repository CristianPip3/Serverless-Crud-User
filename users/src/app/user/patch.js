/**
 * this file will update in the patch use-case for user domain
 */
const { User } = require('src/domain/user')
/**
 * function for update user.
 */
module.exports = ({ userRepository }) => {
  // code for create a item
  const update = ({ id, body }) => {
    return Promise.resolve()
      .then(() =>
        userRepository.findById(id)
          .then(entity => {
            const user = User(body)
            return userRepository.update({ _id: entity._id }, { user })
          }))
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    update
  }
}
