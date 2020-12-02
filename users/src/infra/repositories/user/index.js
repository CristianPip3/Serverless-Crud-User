const { toEntity } = require('./transform')

module.exports = ({ model }) => {
  console.log('MODEL REPOSITORY', model)
  const getAll = (...args) => {
    console.log('ENTRANDO A GETALL')
    return model.batchGet(...args)
      .then(entity => {
        console.log('GETALL', entity)
        return entity
      })
  }

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
    console.log(result)
    if (result && result !== undefined) {
      return toEntity(result)
    } else {
      throw new Error('User Not Found invalid')
    }
  }

  const isExist = (...args) =>
    model.get(...args)
      .then(entity => entity !== null)

  const destroy = (...args) => model.delete(...args)

  return {
    getAll,
    create,
    update,
    findById,
    isExist,
    destroy
  }
}
