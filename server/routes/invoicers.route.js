const invoicers = require('../controllers/invoicers.controller');

const routes = (app) => {
  app.get('/api/invoicers/', invoicers.getAllInvoicers);
  app.post('/api/invoicers', invoicers.createNewInvoicers);
  app.put('/api/invoicers/:id', invoicers.updateInvoicers);
  app.delete('/api/invoicers/:id', invoicers.deleteInvoicers);
};

module.exports = { routes };