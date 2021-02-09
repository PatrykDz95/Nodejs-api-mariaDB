const { tag } = require('../config/db.config.js');
const db = require('../config/db.config.js');
const Tag = db.tag;

// Post a Customer
exports.create = (req, res) => {  
  // Save to MariaDB database
  Tag.create({  
      name: req.body.name,
      customerId : req.body.customerId,
      tag_id : req.body.tag_id,
    })
    .then(tag => {    
      // Send created customer to client
      res.json(tag);
    })
    .catch(error => res.status(400).send(error))
};
 
// Fetch all Customers
exports.findAll = (req, res) => {
    Tag.findAll({
      attributes: { exclude: ["createdAt", "updatedAt"] }
    })
    .then(tag => {
      res.json(tag);
    })
    .catch(error => res.status(400).send(error))
};
 
// Find a Customer by Id
exports.findByPk = (req, res) => {  
    Tag.findByPk(req.params.tagId,
        {attributes: { exclude: ["createdAt", "updatedAt"] }}
      )
      .then(tag => {
          if (!tag){
            return res.status(404).json({message: "Customer Not Found"})
          }
          return res.status(200).json(customer)
        }
      )
      .catch(error => res.status(400).send(error));
};