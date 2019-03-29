const db = require('../models/index.js');
const users = db.Users;
const assigncomponent = db.AssignedComponents
const component = db.Components
var Sequelize = require('sequelize');
const Op = Sequelize.Op;

exports.createNewUsers = async function (req, res) {
  let data;
  try {
    data = await users.create({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNo: req.body.contactNo,
      role: req.body.role,
      status: req.body.status,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: 'Unable to save in database',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'saved in database',
      data,
    });
  }
};

exports.getAllUsers = async function (req, res) {
  users
    .findAll()
    .then((data) => res.status(200).send(data))
    .catch((error) => { res.status(400).send(error); });
};

//find single user
exports.findUser = async function (request, response) {
  let data;
  try {
    data = await users.find({
      where: { id: request.params.id }
    })
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'unable to fetch data',
      data: err,
    })
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'data fetched successfully',
      data,
    })
  }
}
//find username and id
exports.findUserName = async function (request, response) {
  let data;
  try {
    data = await users.findAll({
      attributes: ['firstName', 'id']
    })
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'unable to fetch data',
      data: err,
    })
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'data fetched successfully',
      data,
    })
  }
}
//update user
exports.updateUsers = async function (req, res) {
  try {
    users.findOne({
      where: { id: req.params.id }
    }).then(function (result) {
      return result.update({
        username: req.body.username,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        contactNo: req.body.contactNo,
        role: req.body.role,
        status: req.body.status,
      }).then(function (data) {
        // res.end();
        res.status(200).json({
          status: true,
          message: 'Data sucessfully updated!',
          data: data
        })
      });
    });
  }
  catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To Update.',
      data: err,
    });
  }

};
//delete user
exports.deleteUsers = async function (req, res) {
  let data;
  uid = req.params.id
  let result
  try {
    data = await users.destroy({ where: { id: req.params.id } });

  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To Delete.',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'Deleted Successfully',
      data,
    });
  }

  data1 = assigncomponent.findAll({
    where: { userId: uid },
    attributes: ['componentId'],
  }).then(function (res) {
    component.update({
      status: true
    }, {
        where: {
          id: {
            [Op.in]: [res.dataValues.id]
          }
        }

      }).then(function (output) {
        console.log(output,  "outputting")
      })
  })
};

exports.getUserDetails = async function (request, response) {
  let data;

  try {
    data = await users.find({
      where: { id: request.body.id },
      attributes: ['username', 'password', 'firstName', 'lastName', 'email', 'contactNo', 'role', 'status']
    });
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'Unable To List Data.',
      data: err,
    });
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'All Data fetched successfully',
      data,
    });
  }
};
