exports.up = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.createTable('order_tbl', table => {
      table.increments('order_id').unsigned();
      table.integer('user_id').unsigned();
      table.integer('order_status');
      table.json('order_detail');
      table.datetime('order_created_at').defaultTo(knex.fn.now());
      table.dateTime('order_updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));

      table
        .foreign('user_id')
        .references('user_tbl.user_id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
  );
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable('order_tbl'));
};
