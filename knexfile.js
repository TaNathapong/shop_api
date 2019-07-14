module.exports = {
  development: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'momotaro1',
      database: 'shop_db'
    },
    define: { charset: 'utf8', collate: 'utf8_general_ci' },
    migrations: { directory: __dirname + '/db/migrations' },
    seeds: { directory: __dirname + '/db/seeds' }
  },
  production: {
    client: 'mysql',
    connection: {
      host: '127.0.0.1',
      user: 'root',
      password: 'xxxxxxxx',
      database: 'shop_db'
    },
    define: { charset: 'utf8', collate: 'utf8_general_ci' },
    migrations: { directory: __dirname + '/db/migrations' },
    seeds: { directory: __dirname + '/db/seeds' }
  }
};
