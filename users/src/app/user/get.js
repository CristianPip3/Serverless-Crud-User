/**
 * function for getter user.
 */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const all = (req) => {
    return Promise.resolve()
      .then(() => {
        return userRepository.getAll({})
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
