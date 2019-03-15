const reqcomponents = require('../controllers/requestComponent.controller');

const routes = (app) => {
  app.get('/api/requestComponents/list', reqcomponents.getAllRequestedComponents);
  app.post('/api/requestComponents', reqcomponents.createNewRequestComponents);
  app.put('/api/requestComponents/edit/:id', reqcomponents.updateRequestedComponent);
  app.delete('/api/requestComponents/:id', reqcomponents.deleteRequestedComponents);

  app.post('/api/requestComponents/requestComponentByUser', reqcomponents.getRequestedComponentByUser);
  app.get('/api/requestcomponents/find/:id',reqcomponents.getComponent)
};

module.exports = { routes };