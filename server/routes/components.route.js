const components = require('../controllers/components.controller');

const routes = (app) => {
  app.get('/api/components/list', components.getAllComponents);
  app.post('/api/components', components.createNewComponents);
  app.put('/api/components/edit/:id', components.updateComponents);
  app.delete('/api/components/:id', components.deleteComponents);
  app.post('/api/components/getComponentName', components.getComponentName);


  app.get('/api/components/find/:id',components.findComponent)

};

module.exports = { routes };