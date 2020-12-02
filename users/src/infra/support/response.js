const { assoc } = require('ramda')

module.exports = () => {
  const defaultResponse = (data) => {
    return {
      body: JSON.stringify(
        {
          data
        },
        null,
        2
      )
    }
  }
  const Success = (data, status) => {
    return assoc('statusCode', status, defaultResponse(data))
  }
  const Fail = (message, status) => {
    return assoc('statusCode', status, defaultResponse(message))
  }

  return {
    Success,
    Fail
  }
}
