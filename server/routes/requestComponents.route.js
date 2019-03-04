const reqcomponents = require('../controllers/requestComponent.controller');

const routes = (app) => {
  app.get('/api/requestComponents/', reqcomponents.getAllRequestedComponents);
  app.post('/api/requestComponents', reqcomponents.createNewRequestComponents);
  app.put('/api/requestComponents/:id', reqcomponents.updateRequestedComponent);
  app.delete('/api/requestComponents/:id', reqcomponents.deleteRequestedComponents);

  app.post('/api/requestComponents/requestComponentByUser', reqcomponents.getRequestedComponentByUser);

};

module.exports = { routes };