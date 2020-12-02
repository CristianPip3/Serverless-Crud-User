const dynamoose = require('dynamoose')
require('src/infra/database/models')
module.exports = () => {
  const db = dynamoose
  return db
}
