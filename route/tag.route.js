module.exports = function(app) {
 
    const tags = require('../controller/tag.controller');
 
    // Create a new Customer
    app.post('/api/tags/create', tags.create);
 
    // Retrieve all Customer
    app.get('/api/tags', tags.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/api/tags/:tagId', tags.findByPk);
}