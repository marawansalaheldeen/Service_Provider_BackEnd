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

     await queryInterface.bulkInsert('service', [{
      service_id: 1,
      service_name: 'Tire Change',
      service_description: '',
      service_price: 160,
      created_at: new Date(),
      updated_at: new Date()
    },{
      service_id: 2,
      service_name: 'Fuel Delievery',
      service_description: '',
      service_price: 12,
      created_at: new Date(),
      updated_at: new Date()
    },{
      service_id: 3,
      service_name: 'Car Breakdown',
      service_description: '',
      service_price: 12,
      created_at: new Date(),
      updated_at: new Date()
    },{
      service_id: 4,
      service_name: 'Jump Start',
      service_description: '',
      service_price: 160,
      created_at: new Date(),
      updated_at: new Date()
    },{
      service_id: 5,
      service_name: 'Tow Truck',
      service_description: '',
      service_price: 160,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      service_id: 7,
      service_name: 'Car Service',
      service_description: '',
      service_price: 160,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      service_id: 8,
      service_name: 'Automotive Technician',
      service_description: '',
      service_price: 160,
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
