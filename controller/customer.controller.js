const db = require('../config/db.config.js');
const Customer = db.customers;
const Tag = db.tag;

// Post a Customer
exports.create = (req, res) => {  
  // Save to MariaDB database
  Customer.create({  
      name: req.body.name,
      age: req.body.age,
      password: req.body.password,
      customerId : req.body.customerId,
      tag_id : req.body.tag_id,
    })
    .then(customer => {    
      // Send created customer to client
      res.json(customer);
    })
    .catch(error => res.status(400).send(error))
};
 
exports.loginCustomer = (req, res) => {
  const { name, password } = req.body;

  Customer.findOne(name)
    .then((customer) => {
      if (customer && bcrypt.compareSync(password, customer.password)) {
        res
          .status(200)
          .json(customers);
      } else {
        res.status(401).json({ message: "Invalid Credentials" });
      }
    })
    .catch((err) => {
      res.status(500).json(err);
    });
  };


// Fetch all Customers
exports.findAll = (req, res) => {
  Customer.findAll({
    include: ["tags"],
    })
    .then(customers => {
      res.json(customers);
    })
    .catch(error => res.status(400).send(error))
};
 
// Find a Customer by Id
exports.findByPk = (req, res) => {  
  Customer.findByPk(req.params.customerId,
        {attributes: { exclude: ["createdAt", "updatedAt"] }}
      )
      .then(customer => {
          if (!customer){
            return res.status(404).json({message: "Customer Not Found"})
          }
          return res.status(200).json(customer)
        }
      )
      .catch(error => res.status(400).send(error));
};
 
// Update a Customer
exports.update = (req, res) => {
  return Customer.findByPk(req.params.customerId)
    .then(
      customer => {
        if(!customer){
          return res.status(404).json({
            message: 'Customer Not Found',
          });
        }
        return customer.update({
                    name: req.body.name,
                    age: req.body.age
                  })
                  .then(() => res.status(200).json(customer))
                  .catch((error) => res.status(400).send(error));
        }
      )
    .catch((error) => res.status(400).send(error));       
};
 
// Delete a Customer by Id
exports.delete = (req, res) => {
  return Customer
          .findByPk(req.params.customerId)
          .then(customer => {
            if(!customer) {
              return res.status(400).send({
                message: 'Customer Not Found',
              });
            }
 
            return customer.destroy()
                            .then(() => res.status(200).json({message: "Destroy successfully!"}))
                            .catch(error => res.status(400).send(error));
          })
          .catch(error => res.status(400).send(error));
};