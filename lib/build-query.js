const { map, compose, join, keys, values, isEmpty, reduce, toPairs } = require('ramda');

module.exports = {
  insert: (table, data) => {
    return `INSERT INTO ${table} (` +
      compose(
        join(', '),
        keys
      )(data) +
      ') VALUES (' +
      compose(
        join(', '), 
        map(val => `?`), 
        values
      )(data) + ')';
  },
  get: (table, select, where) => {
    return `SELECT ${join(', ', select)} FROM ${table} WHERE ` +
      compose(
        join(' AND '),
        reduce((acc, val) => acc.concat(`${val[0]} = ?`), []),
        toPairs
      )(where);
  },
  list: (table, select) => {
    return `SELECT ${join(', ', select)} FROM ${table}`
  },
  update: (table, data, where) => {
    return `UPDATE ${table} SET ` +
      compose(
        join(', '),
        reduce((acc, val) => acc.concat(`${val[0]} = ?`), []),
        toPairs
      )(data) +
      ` WHERE ` +
      compose(
        join(' AND '),
        reduce((acc, val) => acc.concat(`${val[0]} = '${val[1]}'`), []),
        toPairs
      )(where);
  },
  delete: (table, data) => {
    return `DELETE FROM ${table} WHERE ` +
      compose(
        join(' AND '),
        reduce((acc, val) => acc.concat(`${val[0]} = ?`), []),
        toPairs
      )(data);
  },
  escapeValues: (data) => {
    return compose(
      map(val => isEmpty(val) ? null : `${val}`), 
      values
    )(data);
  }
}
