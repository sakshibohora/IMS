const invoices = require('../controllers/invoices.controller');

const routes = (app) => {
  app.get('/api/invoices/', invoices.getAllInvoices);
  app.post('/api/invoices', invoices.createInvoices);
  app.put('/api/invoices/:id', invoices.updateInvoices);
  app.delete('/api/invoices/:id', invoices.deleteInvoices);
};

module.exports = { routes };