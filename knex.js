var config = require('./knexfile.js');
var env = process.env.NODE_ENV; // actually_use development
var knex = require('knex')(config[env]);

module.exports = knex;
