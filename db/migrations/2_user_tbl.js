exports.up = function(knex, Promise) {
  return Promise.resolve(
    knex.schema.createTable('user_tbl', table => {
      table.increments('user_id').unsigned();
      table.integer('shop_id').unsigned();
      table.integer('role_id').unsigned();
      table.string('username').unique();
      table.string('password', 100);
      table.string('name');
      table.string('lastname');
      table.string('email');
      table.string('facebook');
      table.string('google');
      table.string('phone');
      table.json('address');
      table.string('user_picture');
      table.boolean('is_user_verify').defaultTo(0);
      table.datetime('user_created_at').defaultTo(knex.fn.now());
      table.dateTime('user_updated_at').defaultTo(knex.raw('NULL ON UPDATE CURRENT_TIMESTAMP'));

      // Foreign key
      table
        .foreign('shop_id')
        .references('shop_tbl.shop_id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');

      table
        .foreign('role_id')
        .references('role_tbl.role_id')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })
  );
};

exports.down = function(knex, Promise) {
  return Promise.resolve(knex.schema.dropTable('user_tbl'));
};
