const { createContainer, asFunction } = require('awilix')
// you can do this
const app = require('./app')
const repository = require('./infra/repositories')
const database = require('./infra/database')
const response = require('./infra/support/response')
const storage = require('./infra/storage')

const container = createContainer()

// SYSTEM
container.register({
  app: asFunction(app).singleton(),
  database: asFunction(database).singleton(),
  response: asFunction(response).singleton(),
  storage: asFunction(storage).singleton(),
  repository: asFunction(repository).singleton()
})

module.exports = container
