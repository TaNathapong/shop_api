exports.up = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.createTable('banner_tbl', table => {
      table.increments('banner_id').unsigned();
      table.integer('shop_id').unsigned();
      table.string('banner_name').unique();
      table.string('banner_picture');
      table.datetime('banner_start_at');
      table.datetime('banner_expire_at');
      table.datetime('banner_created_at').defaultTo(knex.fn.now());
      table.dateTime('banner_updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));

      // Foreign key
      table
        .foreign('shop_id')
        .references('shop_tbl.shop_id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
  );
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable('banner_tbl'));
};
