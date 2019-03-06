const categories = require('../controllers/categories.controller');

const routes = (app) => {
  app.get('/api/categories/list', categories.getAllCategories);
  app.post('/api/categories', categories.createNewCategories);
  app.put('/api/categories/:id', categories.updateCategories);
  app.delete('/api/categories/:id', categories.deleteCategories);

  app.get('/api/categories/getCategoryId', categories.getCategoryId)
};

module.exports = { routes };