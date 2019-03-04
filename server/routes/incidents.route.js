const incidents = require('../controllers/incidents.controller');

const routes = (app) => {
  app.post('/api/incidents/list', incidents.getAllIncidents);
  app.post('/api/incidents', incidents.createIncidents);
  app.put('/api/incidents/:id', incidents.updateIncidents);
  app.delete('/api/incidents/:id', incidents.deleteIncidents);
};

module.exports = { routes };