exports.up = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.createTable('shop_tbl', table => {
      table.increments('shop_id').unsigned();
      table.string('shop_name').unique();
      table.string('shop_domain').unique();
      table.integer('max_item');
      table.boolean('is_shop_verify').defaultTo(0);
      table.datetime('shop_created_at').defaultTo(knex.fn.now());
      table.dateTime('shop_updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));
    })
  );
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable('shop_tbl'));
};
