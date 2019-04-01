const db = require('../models/index.js');
// eslint-disable-next-line prefer-destructuring
const assignComponent = db.AssignedComponents
const users = db.Users
const categories = db.Categories
const components = db.Components

//this API is for creating/adding details of the assigned component
exports.assignComponent = async function (req, res) {
  let data, data1, cid;
  cid = req.body.componentId
  try {
    data = await assignComponent.create({
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      componentId: req.body.componentId,
      assignedBy: req.body.assignedBy,
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
  /*it will update components table status to false 
    where component is assigned to anyone,status:false means component is not available  */
  data1 = components.update({
    status: false
  },
    { where: { id: cid } }
  )
};

//API is used to get all the assigned component
exports.getAllAssignedComponent = async function (req, res) {
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
    data = await assignComponent.findAll({
      // where: { componentId: req.body.componentId },
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
//update assigned component API
exports.updateAssignedComponent = async function (req, res) {
  let data;
  try {
    data = await assignComponent.update({
      userId: req.body.userId,
      categoryId: req.body.categoryId,
      componentId: req.body.componentId,
      assignedBy: req.body.assignedBy,
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
}
//delete assigned Component
exports.deleteComponents = async function (req, res) {
  let data;
  try {
    data = await assignComponent.destroy({ where: { id: req.params.id } });
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
}

/*it will give details of all the assigned component
 with it's username() assignedto assignedby)*/
exports.getAssignedComponentsData = async function (req, res) {
  let data
  try {
    data = await assignComponent.findAll({
      include: [
        {
          model: users,
          attributes: ['username'],
          required: true,
          as: 'AssignedTo'
        },
        {
          model: users,
          attributes: ['username'],
          required: true,
          as: 'AssignedBy'
        },
        {
          model: categories,
          attributes: ['categoryType'],
          required: true
        },
        {
          model: components,
          required: true
        },
      ],
    })
  } catch (err) {
    res.status(404).json({
      status: false,
      message: 'Unable To fetch data.',
      data: err,
    });
  }
  if (data !== undefined) {
    res.status(200).json({
      status: true,
      message: 'fetched Successfully',
      data,
    });
  }
};