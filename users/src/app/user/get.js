/**
 * function for getter user all or query.
 */
module.exports = ({ userRepository }) => {
  // code for getting all the items
  const all = (req) => {
    return Promise.resolve()
      .then(() => {
        const { age, _id, type } = req || {}
        const where = {}
        age && (where.age = { ge: parseInt(age) })
        _id && (where._id = { eq: _id })
        type && (where.type = { eq: type })
        return userRepository.getAll(where)
      })
      .catch(error => {
        throw new Error(error)
      })
  }

  return {
    all
  }
}
