/**
 * this file will delete in the delete use-case for user domain
 */
/**
 * function for delete user.
 */
module.exports = ({ userRepository }) => {
  // code for create a item
  const remove = ({ id }) => {
    return Promise.resolve()
      .then(() => {
        return userRepository.destroy(id)
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    remove
  }
}
