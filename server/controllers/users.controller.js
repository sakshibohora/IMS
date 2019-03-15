const db = require('../models/index.js');
const users = db.Users;

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
    res.status(500).json({
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
  // let data;

  // // PAGINATION
  // let skipping = req.query.skip;
  // let limiting = req.query.limit;
  // let searching = req.query.search;
  // // eslint-disable-next-line prefer-destructuring
  // const asc = req.query.asc;
  // // eslint-disable-next-line prefer-destructuring
  // let sort = req.query.sort;
  // let x = 'ASC';
  // // eslint-disable-next-line prefer-destructuring
  // const Op = db.Sequelize.Op;
  // if (skipping === null || skipping === undefined || skipping === '') {
  //     skipping = 0;
  // }
  // if (limiting === '' || limiting === null || limiting === undefined) {
  //     limiting = null;
  // }
  // if (searching === null || searching === undefined) {
  //     searching = '';
  // }
  // if (sort === null || sort === undefined || sort === '') {
  //     sort = 'id';
  // }
  // if (asc === '0') {
  //     x = 'DESC';
  // } else {
  //     x = 'ASC';
  // }
  // try {
  //     data = await users.findAll({
  //         where: { username: { [Op.iLike]: `${searching}%` } },
  //         order: [[sort, x]],
  //         offset: skipping,
  //         limit: limiting,
  //     });
  // } catch (err) {
  //     res.status(500).json({
  //         status: false,
  //         message: 'Unable To List Data.',
  //         data: err,
  //     });
  // }
  // if (data !== undefined) {
  //     res.status(200).json({
  //         status: true,
  //         message: 'All Data fetched successfully',
  //         data,
  //         metadata: {
  //             skip: req.query.skip,
  //             limit: req.query.limit,
  //             search: req.query.search,
  //         },
  //     });
  // }
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
      attributes:['firstName','id']
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
  let data;
  try {
    data = await users.update({
      username: req.body.username,
      password: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      contactNo: req.body.contactNo,
      role: req.body.role,
      status: req.body.status,
    },
      { where: { id: req.params.id } });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To Update.',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'Updated Successfully',
      data,
    });
  }
};
//delete user
exports.deleteUsers = async function (req, res) {
  let data;
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





// exports.login = async function (request, response) {
//   uname = request.body.userName
//   pword = request.body.passWord
//   let data;
//   try {
//     data = await users.findOne({
//       where: {
//         userName: uname,
//         passWord: pword,
//       }
//     });
//   } catch (err) {
//     response.status(500).json({
//       status: false,
//       message: 'Unable To get Data.',
//       data: err,
//     });
//   }
//   if (data === null) {
//     response.status(200).json({
//       status: false,
//       message: "authentication failed",
//     })
//   }
//   else {
//     response.status(200).json({
//       status: true,
//       message: 'Logged In',
//       data,
//     });
//   }

// };

