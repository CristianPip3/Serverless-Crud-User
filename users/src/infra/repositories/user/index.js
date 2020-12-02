const { toEntity } = require('./transform')

module.exports = ({ model }) => {
  const getAll = (...args) =>
    model.scan(...args).exec()
      .then(entity =>
        entity.map(data =>
          toEntity(data)))
      .catch(error => {
        throw new Error(error)
      })
  const create = (...args) =>
    model.create(...args)
      .then(toEntity)
      .catch(error => {
        throw new Error(error)
      })

  const update = (...args) =>
    model.update(...args)
      .then(toEntity)
      .catch(error => {
        throw new Error(error)
      })

  const findById = async (id) => {
    const result = await model.get(id)
    if (result) {
      return toEntity(result)
    } else {
      throw new Error('User Not Found invalid')
    }
  }
  const destroy = (...args) => model.delete(...args)

  return {
    getAll,
    create,
    update,
    findById,
    destroy
  }
}
