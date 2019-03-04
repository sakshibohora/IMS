const incidentUpdates = require('../controllers/incidentUpdates.controller');

const routes = (app) => {
  app.get('/api/incidentUpdates/', incidentUpdates.getAllIncidentUpdates);
  app.post('/api/incidentUpdates', incidentUpdates.createNewIncidentupdates);
  app.put('/api/incidentUpdates/:id', incidentUpdates.updateIncidentUpdates);
  app.delete('/api/incidentUpdates/:id', incidentUpdates.deleteIncidentUpdates);
};

module.exports = { routes };