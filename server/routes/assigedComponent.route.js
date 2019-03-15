const assignedComponent = require('../controllers/assignedcomponent.controller');

const routes = (app) => {
  app.post('/api/assignedComponent/list', assignedComponent.getAllAssignedComponent);
  app.post('/api/assignedcomponent', assignedComponent.assignComponent);
};

module.exports = { routes };