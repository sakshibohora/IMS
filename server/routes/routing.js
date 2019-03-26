var Sequelize = require('sequelize');
var bcrypt = require('bcrypt-nodejs');
var crypto = require('crypto');
const nodemailer = require('nodemailer')


const db = require('../models/index.js');
const users = db.Users;

const checkSignIn = require('../controllers/middleware.js')
const user = require('../controllers/users.controller');
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
  app.get('/api/users/list', user.getAllUsers);
  app.get('/api/users/name', user.findUserName);
  app.put('/api/users/edit:id', user.updateUsers);
  app.delete('/api/users/delete/:id', user.deleteUsers);
  app.post('/api/users/getUserDetails', passport.authenticate('jwt', { session: false }), checkSignIn, user.getUserDetails);
  // passport.authenticate('jwt', { session: false }), checkSignIn
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




  app.post('/api/users/forgotPassword/', (req, res) => {
    if (req.body.email === '') {
      res.status(400).send('email required');
    }
    console.error(req.body.email);
    users.findOne({
      where: {
        email: req.body.email,
      },
    }).then((user) => {
      if (user === null) {
        console.error('email not in database');
        res.status(403).send('email not in db');
      } else {
        const token1 = crypto.randomBytes(20).toString('hex');
        user.update({
          resetPasswordToken: token1,
          resetPasswordExpires: Date.now() + 36000,
        });

        // sgMail.setApiKey(process.env.SENDGRID_API_KEY);
        var transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: {
            user: 'bacancytechnology.com',
            pass: ''
          }
        });

        var mailOptions = {
          from: 'sakshi.bohora@bacancytechnology.com',
          to: 'sakshibohora@gmail.com',
          subject: 'Sending Email using Node.js',
          text:
            'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
            + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
            + `http://localhost:3000/reset/${token1}\n\n`
            + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',

        };

        transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log("dfghjkl;", error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        });
      }
    });
  });

  // eslint-disable-next-line prefer-destructuring
  const Op = Sequelize.Op;
  app.get('/api/users/reset/:token', (req, res) => {
    console.log('sfsfs', req.params.token)
    users.findOne({
      where: {
        resetPasswordToken: req.params.token,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    }).then((user) => {
      if (user == null) {
        console.log('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      } else {
        res.status(200).send({
          username: user.username,
          message: 'password reset link a-ok',
        });
      }
    }).catch((err) => console.log(err))
  });

  const BCRYPT_SALT_ROUNDS = 12;
  app.put('/api/users/updatePasswordViaEmail', (req, res) => {
    users.findOne({
      where: {
        username: req.body.username,
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: {
          [Op.gt]: Date.now(),
        },
      },
    }).then(user => {
      if (user == null) {
        console.error('password reset link is invalid or has expired');
        res.status(403).send('password reset link is invalid or has expired');
      } else if (user != null) {
        console.log('user exists in db');
        user.update({
          password: req.body.password,
          resetPasswordToken: null,
          resetPasswordExpires: null,
        })
          // })
          .then(() => {
            console.log('password updated');
            res.status(200).send({ message: 'password updated' });
          });
      } else {
        console.error('no user exists in db to update');
        res.status(401).json('no user exists in db to update');
      }
    });
  });


  //request component routes
  app.get('/api/requestComponents/list', reqcomponents.getAllRequestedComponents);
  app.post('/api/requestComponents', reqcomponents.createNewRequestComponents);
  app.put('/api/requestComponents/edit/:id', reqcomponents.updateRequestedComponent);
  app.delete('/api/requestComponents/delete:id', reqcomponents.deleteRequestedComponents);
  app.post('/api/requestComponents/requestComponentByUser', reqcomponents.getRequestedComponentByUser);
  app.get('/api/requestcomponents/find/:id', reqcomponents.getComponent)

  //assigned component routes
  app.get('/api/assignedComponent/list', assignedComponent.getAllAssignedComponent);
  app.post('/api/assignedcomponent', assignedComponent.assignComponent);

  //categories routes
  app.get('/api/categories/list', categories.getAllCategories);
  app.post('/api/categories', categories.createNewCategories);
  app.put('/api/categories/edit/:id', categories.updateCategories);
  app.delete('/api/categories/delete/:id', categories.deleteCategories);
  app.get('/api/categories/getCategoryId', categories.getCategoryId)
  app.get('/api/categories/find/:id', categories.findCategory)

  //component routes
  app.get('/api/components/list', components.getAllComponents);
  app.post('/api/components', components.createNewComponents);
  app.put('/api/components/edit/:id', components.updateComponents);
  app.delete('/api/components/delete:id', components.deleteComponents);
  app.post('/api/components/getComponentName', components.getComponentName);
  app.get('/api/components/find/:id', components.findComponent)

  //incident routes
  app.get('/api/incidents/list/:id', incidents.getAllIncidents);
  app.get('/api/incidents/list', incidents.getIncidents);
  app.post('/api/incidents', incidents.createIncidents);
  app.get('/api/incidents/find/:id', incidents.getIncident);
  app.put('/api/incidents/edit/:id', incidents.updateIncidents);
  app.delete('/api/incidents/:id', incidents.deleteIncidents);

  //incidentupdate routes
  app.get('/api/incidentUpdates/list', incidentUpdates.getAllIncidentUpdates);
  app.get('/api/incidentUpdates/details/:id', incidentUpdates.getIncident);
  app.post('/api/incidentUpdates', incidentUpdates.createNewIncidentupdates);
  app.put('/api/incidentUpdates/edit:id', incidentUpdates.updateIncidentUpdates);
  app.delete('/api/incidentUpdates/delete:id', incidentUpdates.deleteIncidentUpdates);

  //invoicers routes
  app.get('/api/invoicers/', invoicers.getAllInvoicers);
  app.post('/api/invoicers', invoicers.createNewInvoicers);
  app.put('/api/invoicers/:id', invoicers.updateInvoicers);
  app.delete('/api/invoicers/:id', invoicers.deleteInvoicers);

  //invoices routes
  app.get('/api/invoices/', invoices.getAllInvoices);
  app.post('/api/invoices', invoices.createInvoices);
  app.put('/api/invoices/:id', invoices.updateInvoices);
  app.delete('/api/invoices/:id', invoices.deleteInvoices);

}
module.exports = { routes };
