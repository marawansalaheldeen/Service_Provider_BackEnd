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

     await queryInterface.bulkInsert('service_provider', [{
      service_provider_id : 1,
      user_id : 1,
      company_name: 'Total Company',
      company_type: 'Benzene',
      contact_role: '',
      created_at: new Date(),
      updated_at: new Date()
    }],[{
      service_provider_id : 2,
      user_id : 2,
      company_name: 'Abu Ghaly motors',
      company_type: 'Suzuki',
      contact_role: '',
      created_at: new Date(),
      updated_at: new Date()
    }],[{
      service_provider_id : 3,
      user_id : 3,
      company_name: 'Barakat Brothers',
      company_type: 'Suzuki',
      contact_role: '',
      created_at: new Date(),
      updated_at: new Date()
    }],  {})
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
