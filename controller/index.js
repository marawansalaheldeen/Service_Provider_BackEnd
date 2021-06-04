const register = require('./registe-user');
const login = require('./login');
const worker = require('./worker');
const customer = require('./customer');
const service = require('./service');
const servicecProvider = require('./serviceProvider');

module.exports = {
    register,
    login,
    worker,
    customer,
    service,
    servicecProvider
}