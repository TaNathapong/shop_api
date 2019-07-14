const knex = require('../knex');

class UserModel {
  getUser() {
    return knex('user_tbl')
      .innerJoin('role_tbl', 'role_tbl.role_id', 'user_tbl.role_id')
      .innerJoin('shop_tbl', 'shop_tbl.shop_id', 'user_tbl.shop_id');
  }

  getUserByUsername(username) {
    return getUser().where({ username });
  }

  getUserByID(user_id) {
    return getUser().where({ user_id });
  }

  getUserByEmail(email) {
    return getUser().where({ email });
  }

  // getNotiToken(user_id) {
  //   return knex('user_tbl')
  //     .select('noti_token')
  //     .where({ user_id })
  //     .map(el => el.noti_token);
  // }

  // getNotiTokenByRole(role_name) {
  //   return knex('user_tbl')
  //     .innerJoin('role_tbl', 'role_tbl.role_id', 'user_tbl.role_id')
  //     .select('noti_token')
  //     .where({ role_name })
  //     .map(el => el.noti_token);
  // }

  insertUser(data) {
    return knex('user_tbl').insert(data);
  }

  updateUser(data, user_id) {
    return knex('user_tbl')
      .update(data)
      .where({ user_id });
  }

  deleteUser(user_id) {
    return knex('user_tbl')
      .where({ user_id })
      .del();
  }
}

module.exports = new UserModel();
