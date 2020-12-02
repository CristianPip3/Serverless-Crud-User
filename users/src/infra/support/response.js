const { assoc } = require('ramda')

module.exports = () => {
  const defaultResponseTable = (_limit, _page, total) => {
    const limit = parseInt(_limit)
    const page = parseInt(_page)
    return {
      limit,
      total,
      page
    }
  }
  const defaultResponse = (data) => {
    return {
      body: JSON.stringify(
        {
          message: 'Go Serverless v1.0! Your function executed successfully! UPDATE BY ID',
          input: data
        },
        null,
        2
      )
    }
  }

  const Success = (data, status) => {
    return assoc('statusCode', status, defaultResponse(data))
  }
  const SuccessTable = (data, limit, page) => {
    return assoc(
      'docs',
      data.docs,
      defaultResponseTable(limit, page, data.total)
    )
  }

  const Fail = (message, status, requestId) => {
    return assoc('statusCode', status, defaultResponse(message))
  }

  return {
    Success,
    SuccessTable,
    Fail
  }
}
