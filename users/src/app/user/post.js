/**
 * this file will create in the post use-case for user domain
 */
const { User } = require('src/domain/user')

/**
 * function for create user.
 */
module.exports = ({ userRepository, storage }) => {
  // code for create a item
  const create = ({ body }) => {
    if (!body || !body.image) {
      throw new Error('Incorrect body on request')
    }
    return Promise.resolve()
      .then(() =>
        storage.uploadImage(body).then(result => {
          const user = User(result)
          return userRepository.create(user)
        })
      ).catch(error => {
        throw new Error(error)
      })
  }

  return {
    create
  }
}
