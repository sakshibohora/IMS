const incidentUpdates = require('../controllers/incidentUpdates.controller');

const routes = (app) => {
  app.get('/api/incidentUpdates/list', incidentUpdates.getAllIncidentUpdates);
 
  app.get('/api/incidentUpdates/details/:id', incidentUpdates.getIncident);

  app.post('/api/incidentUpdates', incidentUpdates.createNewIncidentupdates);
  app.put('/api/incidentUpdates/edit:id', incidentUpdates.updateIncidentUpdates);
  app.delete('/api/incidentUpdates/delete:id', incidentUpdates.deleteIncidentUpdates);
};

module.exports = { routes };