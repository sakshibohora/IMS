const incidents = require('../controllers/incidents.controller');

const routes = (app) => {
  app.get('/api/incidents/list/:id', incidents.getAllIncidents);
  app.get('/api/incidents/list', incidents.getIncidents);

  app.post('/api/incidents', incidents.createIncidents);
  app.get('/api/incidents/find/:id', incidents.getIncident);
  app.put('/api/incidents/edit/:id', incidents.updateIncidents);
  app.delete('/api/incidents/:id', incidents.deleteIncidents);
};

module.exports = { routes };