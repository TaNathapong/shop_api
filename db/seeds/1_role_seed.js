exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex("role_table")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("role_table").insert([
        { role_id: 1, role_name: "admin", role_prefix: "ADM" },
        { role_id: 2, role_name: "pt", role_prefix: "PT" },
        { role_id: 3, role_name: "mt", role_prefix: "MT" },
        { role_id: 4, role_name: "frontPT", role_prefix: "FPT" },
        { role_id: 5, role_name: "frontMT", role_prefix: "FMT" },
        { role_id: 6, role_name: "customer", role_prefix: "CTM" },
        { role_id: 7, role_name: "marketing", role_prefix: "MKT" }
      ]);
    });
};
