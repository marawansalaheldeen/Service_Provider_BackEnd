'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    await queryInterface.bulkInsert('user_type', [{
      user_type_id: 1,
      user_type: 'Adminstrator',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_type_id: 2,
      user_type: 'Service Provider',
      created_at: new Date(),
      updated_at: new Date()
    },{
      user_type_id: 3,
      user_type: 'Worker',
      created_at: new Date(),
      updated_at: new Date()
    }, {
      user_type_id: 4,
      user_type: 'Customer',
      created_at: new Date(),
      updated_at: new Date()
    }], {})
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
