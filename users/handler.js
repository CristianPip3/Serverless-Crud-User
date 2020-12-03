'use strict'
const container = require('src/container')
const Status = require('http-status')
// const storage = require('src/infra/storage')
const { get, getById, post, patch, remove } = require('src/app/user')
const {
  storage,
  repository: { userRepository },
  response: { Success, Fail }
} = container.cradle

module.exports.create = async (event, context, callback) => {
  const postUseCase = post({ userRepository })
  const entity = JSON.parse(event.body)
  const imageUrl = await storage.uploadImage(entity)
  const body = Object.assign({}, entity, { imageUrl })
  console.log('URL', imageUrl)
  return postUseCase.create({ body })
    .then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST))
    })
}
module.exports.getAll = async (event, context, callback) => {
  const getUseCase = get({ userRepository })
  const objQuery = event.queryStringParameters
  return getUseCase.all(objQuery)
    .then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST))
    })
}
module.exports.getById = async (event, context, callback) => {
  const getByIdUseCase = getById({ userRepository })
  const id = event.pathParameters.id
  return getByIdUseCase.getById({ id })
    .then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST))
    })
}
module.exports.updateById = async (event, context, callback) => {
  const updateByIdUseCase = patch({ userRepository })
  const id = event.pathParameters.id
  const body = JSON.parse(event.body)
  return updateByIdUseCase.update({ id, body })
    .then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST))
    })
}
module.exports.deleteById = async (event, context, callback) => {
  const deleteByIdUseCase = remove({ userRepository })
  const id = event.pathParameters.id
  return deleteByIdUseCase.remove({ id }).then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST))
    })
}
