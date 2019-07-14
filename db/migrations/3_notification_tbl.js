exports.up = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.createTable('notification_tbl', table => {
      table.increments('notification_id').unsigned();
      table.integer('user_id').unsigned();
      table.string('notification_detail');
      table.boolean('is_notify').defaultTo(1);
      table.datetime('notification_created_at').defaultTo(knex.fn.now());
      table.dateTime('notification_updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));

      table
        .foreign('user_id')
        .references('user_tbl.user_id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
  );
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable('notification_tbl'));
};
