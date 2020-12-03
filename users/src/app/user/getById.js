/**
 * function for getter user by id.
 */
module.exports = ({ userRepository }) => {
  // code for getting a item by id
  const getById = ({ id }) => {
    if (!id) {
      throw new Error('Incorrect body on request')
    }
    return Promise.resolve()
      .then(() => userRepository.findById(id))
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    getById
  }
}
