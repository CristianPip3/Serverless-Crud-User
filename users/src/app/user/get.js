/**
 * function for getter user.
 */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const all = (req) => {
    console.log('REPOSITORY GET', userRepository)
    console.log('INGRESANDO', req)
    return Promise.resolve()
      .then(() =>
        userRepository.getAll({})
      )
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
