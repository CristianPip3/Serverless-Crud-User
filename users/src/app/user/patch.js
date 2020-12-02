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
