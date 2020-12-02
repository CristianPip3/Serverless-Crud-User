/**
 * function for getter user by id.
 */
module.exports = ({ userRepository }) => {
  // code for getting a item by id
  const getById = ({ id }) => {
    return Promise.resolve()
      .then(() =>
        userRepository.findById(id)
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    getById
  }
}
