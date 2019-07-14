exports.up = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.createTable('item_tbl', table => {
      table.increments('item_id').unsigned();
      table.integer('shop_id').unsigned();
      table.string('item_name');
      table.string('item_type');
      table.string('item_description');
      table.json('item_detail');
      table.string('item_picture');
      table.datetime('item_created_at').defaultTo(knex.fn.now());
      table.dateTime('item_updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));

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
  return Promise.resolve(knex.schema.dropTable('item_tbl'));
};
