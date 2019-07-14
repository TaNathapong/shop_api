exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('package_table')
    .del()
    .then(function() {
      // Inserts seed entries
      return knex('package_table').insert([
        // mt
        {
          package_id: 1,
          package_name: 'Standard (< 35 ปี)',
          treatment_array: '[1, 2, 5, 8, 11]',
          type: 'mt'
        },
        {
          package_id: 2,
          package_name: 'Standard (> 35 ปี)',
          treatment_array: '[1, 2, 5, 8, 11, 12, 13, 14, 15, 16, 17, 20, 21, 22]',
          type: 'mt'
        },
        {
          package_id: 3,
          package_name: 'Silver',
          treatment_array: '[1, 2, 5, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 36, 37, 38, 39]',
          type: 'mt'
        },
        {
          package_id: 4,
          package_name: 'Gold',
          treatment_array: '[1, 2, 5, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 36, 37, 38, 39, 49, 50, 51]',
          type: 'mt'
        },
        {
          package_id: 5,
          package_name: 'Platinum',
          treatment_array:
            '[1, 2, 5, 8, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 24, 36, 37, 38, 39, 43, 44, 46, 47, 49, 50, 51]',
          type: 'mt'
        },
        // pt
        { package_id: 6, package_name: 'นวดกายภาพบำบัด', treatment_array: null, type: 'pt' },
        // tm
        { package_id: 7, package_name: 'นวดไทย', treatment_array: null, type: 'tm' }
      ]);
    });
};
