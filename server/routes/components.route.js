const components = require('../controllers/components.controller');

const routes = (app) => {
  app.get('/api/components/', components.getAllComponents);
  app.post('/api/components', components.createNewComponents);
  app.put('/api/components/:id', components.updateComponents);
  app.delete('/api/components/:id', components.deleteComponents);

  app.post('/api/components/getComponentName', components.getComponentName);
};

module.exports = { routes };