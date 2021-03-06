'use strict';

const sequelize = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('distance_prices', {
      distance_price_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      metric_unit: {
        type: Sequelize.STRING
      },
      metric_price: {
        type: Sequelize.INTEGER
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('user_type', {
      user_type_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_type: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('user', {
      user_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_type_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user_type',
          key: 'user_type_id'
        }
      },
      user_first_name: {
        type: Sequelize.STRING
      },
      user_last_name: {
        type: Sequelize.STRING
      },
      user_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone_number: {
        type: Sequelize.STRING
      },
      user_password: {
        type: Sequelize.STRING
      },
      is_confirmed: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      socket_id:{
        type: Sequelize.STRING
      },
      longitude: {
        type: Sequelize.STRING
      },
      latitude: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('customer', {
      customer_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id'
        }
      },
      total_fees: {
        type: Sequelize.DOUBLE,
        defaultValue: '0'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps  : true
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        timestamps  : true
      }
    });

    await queryInterface.createTable('customer_car', {
      customer_car_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'customer',
          key: 'customer_id'
        }
      },
      car_maker: {
        type: Sequelize.STRING,
      },
      car_model: {
        type: Sequelize.STRING,
      },
      car_license: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('service_provider', {
      service_provider_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id'
        }
      },
      company_name: {
        type: Sequelize.STRING,
      },
      company_type: {
        type: Sequelize.STRING,
      },
      contact_role: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('service_provider_location', {
      service_provider_location_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      service_provider_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'service_provider',
          key: 'service_provider_id'
        }
      },
      city: {
        type: Sequelize.STRING,
      },
      area: {
        type: Sequelize.STRING,
      },
      street: {
        type: Sequelize.STRING,
      },
      status: {
        type: Sequelize.STRING,
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('worker', {
      worker_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id'
        }
      },
      service_provider_location_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'service_provider_location',
          key: 'service_provider_location_id'
        }
      },
      is_available: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
      },
      worker_rating: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('service', {
      service_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      service_name: {
        type: Sequelize.STRING
      },
      service_description: {
        type: Sequelize.STRING
      },
      service_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('fuel_category', {
      fuel_category_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      service_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'service',
          key: 'service_id'
        }
      },
      fuel_category_name: {
        type: Sequelize.STRING
      },
      fuel_category_description: {
        type: Sequelize.STRING,
        allowNull: true
      },
      fuel_category_price: {
        type: Sequelize.DOUBLE,
        allowNull: false
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('service_provider_service', {
      sps_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fuel_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'fuel_category',
          key: 'fuel_category_id'
        }
      },
      service_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'service',
          key: 'service_id'
        }
      },
      service_provider_location_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'service_provider_location',
          key: 'service_provider_location_id'
        }
      },
      is_available: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('request', {
      request_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      customer_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'user',
          key: 'user_id'
        }
      },
      service_provider_location_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user',
          key: 'user_id'
        }
      },
      service_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'service',
          key: 'service_id'
        }
      },
      fuel_category_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'fuel_category',
          key: 'fuel_category_id'
        }
      },
      request_status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending'
      },
      worker_id:{
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: 'user',
          key: 'user_id'
        }
      },
      total_price: {
        type: Sequelize.DOUBLE,
        defaultValue: 0
      },
      is_cancelled: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      assigined_date: {
        type: Sequelize.DATE
      },
      fine: {
        type: Sequelize.DOUBLE,
        defaultValue: '0'
      }, 
      rating: {
        type: Sequelize.DOUBLE,
        defaultValue: '0'
      },
      passengers: {
        type: Sequelize.INTEGER,
        defaultValue: '0'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.createTable('request_service_provider', {
      request_sp_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      request_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'request',
          key: 'request_id'
        }
      },
      service_provider_location_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'service_provider_location',
          key: 'service_provider_location_id'
        }
      },
      request_status: {
        type: Sequelize.STRING,
        defaultValue: 'Pending'
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('distance_prices');
  }
};