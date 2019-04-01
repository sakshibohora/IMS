const db = require('../models/index');

const incidents = db.Incidents;
const incidentUpdates = db.IncidentUpdates;
const users = db.Users

exports.createIncidents = async function (request, response) {
  let data;
  // eslint-disable-next-line prefer-const
  try {
    data = await incidents.create({
      incidentBy: request.body.incidentBy,
      incidentName: request.body.incidentName,
      incident: request.body.incident,
      updates: request.body.updates,
      resolvedBy: request.body.resolvedBy,
      status: request.body.status,
    });
  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'unable to insert data',
      data: err,
    });
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'data inserted',
      data,
    });
  }
};

exports.getAllIncidents = async function (request, response) {
  let data;
  // PAGINATION
  let skipping = request.query.skip;
  let limiting = request.query.limit;
  let searching = request.query.search;
  // eslint-disable-next-line prefer-destructuring
  const asc = request.query.asc;
  // eslint-disable-next-line prefer-destructuring
  let sort = request.query.sort;
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
    data = await incidents.findAll({
      where: { incidentBy: request.params.id },
      // order: [[sort, x]],
      // offset: skipping,
      // limit: limiting,
    });
  } catch (err) {
    response.status(404).json({
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
      metadata: {
        skip: request.query.skip,
        limit: request.query.limit,
        search: request.query.search,
      },
    });
  }
};

exports.getIncidentData = async function (request, response) {
  let data;
  try {
    data = await incidents.find({
      where: { id: request.params.id },
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



exports.updateIncidents = async function (request, response) {
  let data, data1;
  try {
    data = await incidents.update({
      incidentBy: request.body.incidentBy,
      incidentName: request.body.incidentName,
      incident: request.body.incident,
      updates: request.body.updates,
      resolvedBy: request.body.resolvedBy,
      status: request.body.status,
    }, { where: { id: request.params.id } });



  } catch (err) {
    response.status(500).json({
      status: false,
      message: 'Unable To Update.',
      data: err,
    });
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'Updated Successfully',
      data,
    });
  }
  data1 = incidentUpdates.create({
    incidentId: request.params.id,
    updateBy: request.body.resolvedBy,
    updates: request.body.updates,
    status: request.body.status,
  })
};
exports.deleteIncidents = async function (request, response) {
  let data;
  try {
    data = await incidents.destroy({ where: { id: request.params.id } });
  } catch (err) {
    response.status(404).json({
      status: false,
      message: 'Unable To Delete.',
      data: err,
    });
  }
  if (data !== undefined) {
    response.status(200).json({
      status: true,
      message: 'Deleted Successfully',
      data,
    });
  }
};

exports.getIncidents = async function (request, response) {
  let data;

  try {
    data = await incidents.findAll({
    });
  } catch (err) {
    response.status(404).json({
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



exports.getIncidentdetails = async function (req, res) {
  let data
  try {
    data = await incidents.findAll({
      include: [
        {
          model: users,
          attributes: ['username'],
          required: true
        }
      ]
    })
  } catch (err) {
    res.status(404).json({
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



exports.getResolvedByName = async function (request, response) {
  let data;

  try {
    data = await db.Users.findAll({
      attributes: ['username', 'id']
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

exports.getIncidentById = async function (request, response) {
  let data;

  try {
    data = await incidents.findAll({
      include: [
        {
          model: db.Users,
          attributes: ['username'],
          required: false,
          as: 'ResolvedBy'
        },
      ],
      where: { incidentBy: request.params.id }
    });
    if (data) {
      response.status(200).json({
        status: true,
        message: 'All Data fetched successfully',
        data,
      });
    }
  } catch (err) {
    console.log('hujhu', err);
    response.status(500).json({
      status: false,
      message: 'Unable To List Data.',
      data: err,
    });
  }
};