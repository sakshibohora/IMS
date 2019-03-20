const categories = require('../controllers/categories.controller');

const routes = (app) => {
  app.get('/api/categories/list', categories.getAllCategories);
  app.post('/api/categories', categories.createNewCategories);
  app.put('/api/categories/edit/:id', categories.updateCategories);
  app.delete('/api/categories/delete/:id', categories.deleteCategories);
  app.get('/api/categories/getCategoryId', categories.getCategoryId)

  app.get('/api/categories/find/:id',categories.findCategory)

};

module.exports = { routes };