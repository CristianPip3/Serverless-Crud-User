/**
 * We want to start here so we can manage other infrastructure
 * database
 * memcache
 * express server
 */
module.exports = ({ database }) => {
  return {
    connect: () =>
      Promise.resolve()
        .then(database)
  }
}
