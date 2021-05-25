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

     await queryInterface.bulkInsert('fuel_category', [{
      service_id: 9,
      fuel_category_name: '80',
      fuel_category_description: '',
      fuel_category_price: 85,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      service_id: 9,
      fuel_category_name: '85',
      fuel_category_description: '',
      fuel_category_price: 90,
      created_at: new Date(),
      updated_at: new Date()
    },{
      service_id: 9,
      fuel_category_name: '90',
      fuel_category_description: '',
      fuel_category_price: 95,
      created_at: new Date(),
      updated_at: new Date()
    }, {
      service_id: 9,
      fuel_category_name: '92',
      fuel_category_description: '',
      fuel_category_price: 96,
      created_at: new Date(),
      updated_at: new Date()
    },{
      service_id: 9,
      fuel_category_name: '95',
      fuel_category_description: '',
      fuel_category_price: 100,
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
