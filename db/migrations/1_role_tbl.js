exports.up = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.createTable('role_tbl', table => {
      table.increments('role_id').unsigned();
      table.string('role_name').unique();
      table.datetime('role_created_at').defaultTo(knex.fn.now());
      table.dateTime('role_updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    })
  );
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable('role_tbl'));
};
