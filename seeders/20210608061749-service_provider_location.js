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
     await queryInterface.bulkInsert('service_provider_location', [{
      service_provider_location_id: 1,
      service_provider_id: 1,
      city: 'Alexandria',
      area: 'مصطفى كامل',
      street: '498 Mostafa Kamel Street, Alexandria',
      status: 'In_Active',
      created_at: new Date(),
      updated_at: new Date()
    }],[{
      service_provider_location_id: 2,
      service_provider_id: 2,
      city: 'Alexandria',
      area: 'سيدي جابر',
      street: '4 توت عنخ امون، St، سيدي جابر، الإسكندرية',
      status: 'In_Active',
      created_at: new Date(),
      updated_at: new Date()
    }],
    [{
      service_provider_location_id: 3,
      service_provider_id: 3,
      city: 'Alexandria',
      area: 'سيدي جابر',
      street: '33 توت عنخ امون، الرياضة، سيدي جابر، الإسكندرية',
      status: 'In_Active',
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
