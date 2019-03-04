const inventories = require('../controllers/Inventories.controller');

const routes = (app) => {
  app.get('/inventories/', inventories.getAllInventories);
  app.post('/inventories', inventories.createNewInventories);
  app.put('/inventories/:id', inventories.updateInventories);
  app.delete('/inventories/:id', inventories.deleteInventories);
};

module.exports = { routes };