module.exports = function(app) {
 
    const customers = require('../controller/customer.controller');
 
    // Create a new Customer
    app.post('/api/customers/create', customers.create);
 
    // Retrieve all Customer
    app.get('/api/customers', customers.findAll);

     // login customer if exists
    app.post('/login', customers.loginCustomer);
 
    // Retrieve a single Customer by Id
    app.get('/api/customers/:customerId', customers.findByPk);
 
    // Update a Customer with Id
    app.put('/api/customers/:customerId', customers.update);
 
    // Delete a Customer with Id
    app.delete('/api/customers/:customerId', customers.delete);
}