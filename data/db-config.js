const knex = require('knex');

const dbEnvironment = 'production'
const knexConfig = require('../knexfile')[dbEnvironment];
module.exports = knex(knexConfig);