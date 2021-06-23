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
     await queryInterface.bulkInsert('user', [{
      user_id: 1,
      user_type_id: 2,
      user_first_name: 'Ali',
      user_last_name: 'Mohamed',
      user_email: 'toyota@gmail.com',
      phone_number: '01258963258',
      user_password: '41387532a64ac3822edae0a81a5608890b275e5b569be095794f6b53aaf587696de17fecd6d7d15dd3579d7d6d293ef3270439653b8561162e02ab128d637ce8db833b997638a32957da52dcfb55662df5e3843286a708afc50257d867a41222f7a0cb4a',
      is_confirmed: 1,
      longitude: 29.994128,
      latitude: 31.246984,
      created_at: new Date(),
      updated_at: new Date()
    },
    {
      user_id: 2,
      user_type_id: 2,
      user_first_name: 'Morad',
      user_last_name: 'Kareem',
      user_email: 'Suzuki@gmail.com',
      phone_number: '01258922258',
      user_password: '41387532a64ac3822edae0a81a5608890b275e5b569be095794f6b53aaf587696de17fecd6d7d15dd3579d7d6d293ef3270439653b8561162e02ab128d637ce8db833b997638a32957da52dcfb55662df5e3843286a708afc50257d867a41222f7a0cb4a',
      is_confirmed: 1,
      longitude: 29.934899,
      latitude: 31.209982,
      created_at: new Date(),
      updated_at: new Date()
    },{
      user_id: 3,
      user_type_id: 2,
      user_first_name: 'Saeed',
      user_last_name: 'Mady',
      user_email: 'Suzuki1@gmail.com',
      phone_number: '01258172258',
      user_password: '41387532a64ac3822edae0a81a5608890b275e5b569be095794f6b53aaf587696de17fecd6d7d15dd3579d7d6d293ef3270439653b8561162e02ab128d637ce8db833b997638a32957da52dcfb55662df5e3843286a708afc50257d867a41222f7a0cb4a',
      is_confirmed: 1,
      longitude: 29.934907,
      latitude: 31.209729,
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
