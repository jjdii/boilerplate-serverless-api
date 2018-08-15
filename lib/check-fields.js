const { compose, difference, keys, contains, filter, not } = require('ramda');

module.exports = {
  required: (requiredFields, fields) =>
    compose(
      difference(requiredFields), 
      keys
    )(fields),
  unallowed: (allowedFields, fields) =>
    compose(
      filter(field => not(contains(field, allowedFields))),
      keys
    )(fields)
}
