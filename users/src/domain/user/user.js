const t = require('tcomb')
const { compose } = require('ramda')
const { cleanData } = require('../helper')

const User = t.struct({
  _id: t.maybe(t.String),
  names: t.String,
  lastName: t.maybe(t.String),
  type: t.maybe(t.String),
  identification: t.maybe(t.String),
  age: t.maybe(t.Number),
  city: t.maybe(t.String),
  imageUrl: t.maybe(t.String),
  createdAt: t.maybe(t.Date),
  updatedAt: t.maybe(t.Date)
})

module.exports = compose(cleanData, User)
