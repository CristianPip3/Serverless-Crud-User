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
module.exports.getAll = async event => {
  console.log('REPOSITORY HANDLER', userRepository)
  const getUseCase = get({ userRepository })
  const result = await getUseCase.all(event)
  console.log(result)
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully! GET ALL',
        input: result
      },
      null,
      2
    )
  }
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
module.exports.updateById = async event => {
  const updateByIdUseCase = patch({ userRepository })
  const id = event.pathParameters.id
  const body = JSON.parse(event.body)
  const result = await updateByIdUseCase.update({ id, body })
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully! UPDATE BY ID',
        input: result
      },
      null,
      2
    )
  }

  // Use this code if you don't use the http event with the LAMBDA-PROXY integration
  // return { message: 'Go Serverless v1.0! Your function executed successfully!', event };
}
module.exports.deleteById = async event => {
  const deleteByIdUseCase = remove({ userRepository })
  const id = event.pathParameters.id
  const result = await deleteByIdUseCase.remove({ id })
  return {
    statusCode: 200,
    body: JSON.stringify(
      {
        message: 'Go Serverless v1.0! Your function executed successfully! DELETE BY ID',
        input: result
      },
      null,
      2
    )
  }
}
