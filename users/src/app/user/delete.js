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
      .then(() => userRepository.findById(id).then(entity => userRepository.destroy(entity._id)))
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    remove
  }
}
