'use strict'
const container = require('src/container')
const Status = require('http-status')
const { get, getById, post, patch, remove } = require('src/app/user')
const {
  repository: { userRepository },
  response: { Success, Fail }
} = container.cradle

module.exports.create = async (event, context, callback) => {
  const postUseCase = post({ userRepository })
  const body = JSON.parse(event.body)
  return postUseCase.create({ body })
    .then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST, context.awsRequestId))
    })
}
module.exports.getAll = async (event, context, callback) => {
  const getUseCase = get({ userRepository })
  return getUseCase.all(event.body)
    .then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST, context.awsRequestId))
    })
}
module.exports.getById = async (event, context, callback) => {
  const getByIdUseCase = getById({ userRepository })
  const id = event.pathParameters.id
  return getByIdUseCase.getById({ id })
    .then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST, context.awsRequestId))
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
      callback(null, Fail(error.message, Status.BAD_REQUEST, context.awsRequestId))
    })
}

module.exports.deleteById = async (event, context, callback) => {
  const deleteByIdUseCase = remove({ userRepository })
  const id = event.pathParameters.id
  return deleteByIdUseCase.remove({ id }).then(data => callback(null, Success(data, Status.OK)))
    .catch(error => {
      console.error(error)
      callback(null, Fail(error.message, Status.BAD_REQUEST, context.awsRequestId))
    })
}
