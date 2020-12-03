/**
 * this file will delete in the delete use-case for user domain
 */
/**
 * function for delete user first look for it then delete it .
 */
module.exports = ({ userRepository }) => {
  // code for delete a item
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
