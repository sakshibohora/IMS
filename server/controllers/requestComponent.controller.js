const db = require('../models/index.js');

// eslint-disable-next-line prefer-destructuring
const reqcomponents = db.RequestComponents;
const users = db.Users
const categories = db.Categories
exports.createNewRequestComponents = async function (req, res) {
  let data;
  try {
    data = await reqcomponents.create({
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      componentId: req.body.componentId,
      componentName: req.body.componentName,
      issue: req.body.issue,
    });
  } catch (err) {
    res.status(404).json({
      status: false,
      message: 'Unable to save in database',
      data: err,
    });
  }
  if (data) {
    res.status(200).json({
      status: true,
      message: 'saved in database',
      data,
    });
  }
};

exports.getAllRequestedComponents = async function (req, res) {
  let data;

  // PAGINATION
  let skipping = req.query.skip;
  let limiting = req.query.limit;
  let searching = req.query.search;
  // eslint-disable-next-line prefer-destructuring
  const asc = req.query.asc;
  // eslint-disable-next-line prefer-destructuring
  let sort = req.query.sort;
  let x = 'ASC';
  // eslint-disable-next-line prefer-destructuring
  const Op = db.Sequelize.Op;
  if (skipping === null || skipping === undefined || skipping === '') {
    skipping = 0;
  }
  if (limiting === '' || limiting === null || limiting === undefined) {
    limiting = null;
  }
  if (searching === null || searching === undefined) {
    searching = '';
  }
  if (sort === null || sort === undefined || sort === '') {
    sort = 'id';
  }
  if (asc === '0') {
    x = 'DESC';
  } else {
    x = 'ASC';
  }
  try {
    data = await reqcomponents.findAll({
      where: { componentName: { [Op.iLike]: `${searching}%` } },
      order: [[sort, x]],
      offset: skipping,
      limit: limiting,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To List Data.',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'All Data fetched successfully',
      data,
      metadata: {
        skip: req.query.skip,
        limit: req.query.limit,
        search: req.query.search,
      },
    });
  }
};

exports.updateRequestedComponent = async function (req, res) {
  let data;
  try {
    data = await reqcomponents.update({
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      componentId: req.body.componentId,
      componentName: req.body.componentName,
      issue: req.body.issue,
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

exports.deleteRequestedComponents = async function (req, res) {
  let data;
  try {
    data = await reqcomponents.destroy({ where: { id: req.params.id } });
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


exports.getRequestedComponentByUser = async function (req, res) {
  let data;
  let count = 0;

  // PAGINATION
  let skipping = req.query.skip;
  let limiting = req.query.limit;
  let searching = req.query.search;
  // eslint-disable-next-line prefer-destructuring
  const asc = req.query.asc;
  // eslint-disable-next-line prefer-destructuring
  let sort = req.query.sort;
  let x = 'ASC';
  // eslint-disable-next-line prefer-destructuring
  const Op = db.Sequelize.Op;
  if (skipping === null || skipping === undefined || skipping === '') {
    skipping = 0;
  }
  if (limiting === '' || limiting === null || limiting === undefined) {
    limiting = 10;
  }
  if (searching === null || searching === undefined) {
    searching = '';
  }
  if (sort === null || sort === undefined || sort === '') {
    sort = 'id';
  }
  if (asc === '0') {
    x = 'DESC';
  } else {
    x = 'ASC';
  }
  try {
    data = await reqcomponents.findAll({
      where: { userId: req.body.userId },
      offset: skipping,
      limit: limiting,
    });
    count = await reqcomponents.count();
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'Unable To List Data.',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'All Data fetched successfully',
      data,
      count,
      metadata: {
        skip: req.query.skip,
        limit: req.query.limit,
        search: req.query.search,
      },
    });
  }
};


exports.getComponent = async function (request, response) {
  let data;
  try {
    data = await reqcomponents.find({
      //  where: { id: request.params.id },
    })
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'unable to find data',
      data: err,
    })
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'All Data fetched successfully',
      data,
    });
  }
}

exports.getRequestComponentDetails = async function (req, res) {
  let data
  try {
    data = await reqcomponents.findAll({
      include: [
        {
          model: users,
          attributes: ['username'],
          required: true,
        },
        {
          model: categories,
          attributes: ['categoryType'],
          required: true,
        }
      ]
    })
  } catch (err) {
    res.status(500).json({
      status: false,
      message: 'unable to find data',
      data: err,
    })
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'All Data fetched successfully',
      data,
    });
  }
}