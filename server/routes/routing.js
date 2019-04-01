var bcrypt = require('bcrypt-nodejs');



const db = require('../models/index.js');
const users = db.Users;

const checkSignIn = require('../controllers/middleware.js')
const user = require('../controllers/users.controller');
const forgotPassword = require('../controllers/forgetpassword.controller');
const reqcomponents = require('../controllers/requestComponent.controller');
const assignedComponent = require('../controllers/assignedcomponent.controller');
const categories = require('../controllers/categories.controller');
const components = require('../controllers/components.controller');
const incidents = require('../controllers/incidents.controller');
const incidentUpdates = require('../controllers/incidentUpdates.controller');
const invoicers = require('../controllers/invoicers.controller');
const invoices = require('../controllers/invoices.controller');

const jwt = require('jsonwebtoken');
const passport = require('passport');



require('../config/passport')(passport);

const routes = (app) => {
  app.post('/api/users', user.createNewUsers);
  app.get('/api/users/find/:id', user.findUser)
  app.get('/api/users/list', passport.authenticate('jwt', { session: false }), checkSignIn, user.getAllUsers);
  app.get('/api/users/name', passport.authenticate('jwt', { session: false }), checkSignIn, user.findUserName);
  app.put('/api/users/edit:id', passport.authenticate('jwt', { session: false }), checkSignIn, user.updateUsers);
  app.delete('/api/users/delete/:id', passport.authenticate('jwt', { session: false }), checkSignIn, user.deleteUsers);
  app.post('/api/users/getUserDetails', passport.authenticate('jwt', { session: false }), checkSignIn, user.getUserDetails);
  app.post('/api/users/forgotPassword/', forgotPassword.forgotPassword);
  app.get('/api/users/reset/:token', forgotPassword.resetpassword)
  app.put('/api/users/updatePasswordViaEmail', forgotPassword.updatePasswordViaEmail)

  app.post('/api/users/login/', function (req, res) {
    users
      .find({
        where: {
          username: req.body.username,
        }
      })
      .then((user) => {
        if (!user) {
          return res.status(401).send({
            message: 'Authentication failed. User not found.',
          });
        }
        user.comparePassword(req.body.password, (err, isMatch) => {
          if (isMatch && !err) {
            var token = jwt.sign(JSON.parse(JSON.stringify(user)), 'nodeauthsecret', { expiresIn: 3600 });
            jwt.verify(token, 'nodeauthsecret', function (err, data) {
            })
            res.json({ success: true, token: 'JWT ' + token, User: user });
          } else {
            res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
          }
        })
      })
      .catch((error) => res.status(400).send(error));
  });
  //request component routes
  app.get('/api/requestComponents/list', passport.authenticate('jwt', { session: false }), checkSignIn, reqcomponents.getAllRequestedComponents);
  app.post('/api/requestComponents/',reqcomponents.createNewRequestComponents);
  app.put('/api/requestComponents/edit/:id', passport.authenticate('jwt', { session: false }), checkSignIn, reqcomponents.updateRequestedComponent);
  app.delete('/api/requestComponents/delete:id', passport.authenticate('jwt', { session: false }), checkSignIn, reqcomponents.deleteRequestedComponents);
  app.post('/api/requestComponents/requestComponentByUser', passport.authenticate('jwt', { session: false }), checkSignIn, reqcomponents.getRequestedComponentByUser);
  app.get('/api/requestcomponents/find/:id', passport.authenticate('jwt', { session: false }), checkSignIn, reqcomponents.getComponent)
  app.get('/api/requestComponents/getRequestComponentDetails', passport.authenticate('jwt', { session: false }), checkSignIn, reqcomponents.getRequestComponentDetails)


  //assigned component routes
  app.get('/api/assignedComponent/list', passport.authenticate('jwt', { session: false }), checkSignIn, assignedComponent.getAllAssignedComponent);
  app.post('/api/assignedcomponent', passport.authenticate('jwt', { session: false }), checkSignIn, assignedComponent.assignComponent);
  app.get('/api/assigncomponents/getAssignedComponentsData', passport.authenticate('jwt', { session: false }), checkSignIn, assignedComponent.getAssignedComponentsData)

  //categories routes
  app.get('/api/categories/list', passport.authenticate('jwt', { session: false }), checkSignIn, categories.getAllCategories);
  app.post('/api/categories', passport.authenticate('jwt', { session: false }), checkSignIn, categories.createNewCategories);
  app.put('/api/categories/edit/:id', passport.authenticate('jwt', { session: false }), checkSignIn, categories.updateCategories);
  app.delete('/api/categories/delete/:id', passport.authenticate('jwt', { session: false }), checkSignIn, categories.deleteCategories);
  app.get('/api/categories/getCategoryId', passport.authenticate('jwt', { session: false }), checkSignIn, categories.getCategoryId)
  app.get('/api/categories/find/:id', passport.authenticate('jwt', { session: false }), checkSignIn, categories.findCategory)

  //component routes
  app.get('/api/components/list', passport.authenticate('jwt', { session: false }), checkSignIn, components.getAllComponents);
  app.post('/api/components', passport.authenticate('jwt', { session: false }), checkSignIn, components.createNewComponents);
  app.put('/api/components/edit/:id', passport.authenticate('jwt', { session: false }), checkSignIn, components.updateComponents);
  app.delete('/api/components/delete:id', passport.authenticate('jwt', { session: false }), checkSignIn, components.deleteComponents);
  app.post('/api/components/getComponentName', passport.authenticate('jwt', { session: false }), checkSignIn, components.getComponentName);
  app.get('/api/components/find/:id', passport.authenticate('jwt', { session: false }), checkSignIn, components.findComponent)

  //incident routes
  app.get('/api/incidents/list/:id', passport.authenticate('jwt', { session: false }), checkSignIn, incidents.getAllIncidents);
  app.get('/api/incidents/list', passport.authenticate('jwt', { session: false }), checkSignIn, incidents.getIncidents);
  app.post('/api/incidents', passport.authenticate('jwt', { session: false }), checkSignIn, incidents.createIncidents);
  app.get('/api/incidents/find/:id', passport.authenticate('jwt', { session: false }), checkSignIn, incidents.getIncidentData);
  app.put('/api/incidents/edit/:id', passport.authenticate('jwt', { session: false }), checkSignIn, incidents.updateIncidents);
  app.delete('/api/incidents/:id', passport.authenticate('jwt', { session: false }), checkSignIn, incidents.deleteIncidents);
  app.get('/api/incidents/getincidentDetails', passport.authenticate('jwt', { session: false }), checkSignIn, incidents.getIncidentdetails)
  app.get('/api/incidents/getResolvedByName/', incidents.getResolvedByName);
  app.get('/api/incidents/getIncidentById/:id', incidents.getIncidentById);
  //incidentupdate routes


  app.get('/api/incidentUpdates/list', passport.authenticate('jwt', { session: false }), checkSignIn, incidentUpdates.getAllIncidentUpdates);
  app.get('/api/incidentUpdates/details/:id', passport.authenticate('jwt', { session: false }), checkSignIn, incidentUpdates.getIncident);
  app.post('/api/incidentUpdates', passport.authenticate('jwt', { session: false }), checkSignIn, incidentUpdates.createNewIncidentupdates);
  app.put('/api/incidentUpdates/edit:id', passport.authenticate('jwt', { session: false }), checkSignIn, incidentUpdates.updateIncidentUpdates);
  app.delete('/api/incidentUpdates/delete:id', passport.authenticate('jwt', { session: false }), checkSignIn, incidentUpdates.deleteIncidentUpdates);

  //invoicers routes
  
  app.get('/api/invoicers/', passport.authenticate('jwt', { session: false }), checkSignIn, invoicers.getAllInvoicers);
  app.post('/api/invoicers', passport.authenticate('jwt', { session: false }), checkSignIn, invoicers.createNewInvoicers);
  app.put('/api/invoicers/:id', passport.authenticate('jwt', { session: false }), checkSignIn, invoicers.updateInvoicers);
  app.delete('/api/invoicers/:id', passport.authenticate('jwt', { session: false }), checkSignIn, invoicers.deleteInvoicers);

  //invoices routes
  app.get('/api/invoices/', passport.authenticate('jwt', { session: false }), checkSignIn, invoices.getAllInvoices);
  app.post('/api/invoices', passport.authenticate('jwt', { session: false }), checkSignIn, invoices.createInvoices);
  app.put('/api/invoices/:id', passport.authenticate('jwt', { session: false }), checkSignIn, invoices.updateInvoices);
  app.delete('/api/invoices/:id', passport.authenticate('jwt', { session: false }), checkSignIn, invoices.deleteInvoices);

}
module.exports = { routes };
