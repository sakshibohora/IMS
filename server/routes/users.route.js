const user = require('../controllers/users.controller');
const checkSignIn = require('../controllers/middleware.js')

const jwt = require('jsonwebtoken');
const passport = require('passport');

const db = require('../models/index.js');
const users = db.Users;

require('../config/passport')(passport);

const routes = (app) => {
  app.post('/api/users', user.createNewUsers);
  app.get('/api/users/list', user.getAllUsers);
  app.put('/api/users/:id', user.updateUsers);
  app.delete('/api/users/:id', user.deleteUsers);
  app.post('/api/users/getUserDetails', passport.authenticate('jwt', { session: false }), checkSignIn, user.getUserDetails);
  // passport.authenticate('jwt', { session: false }), checkSignIn
  app.post('/api/users/login/', function (req, res) {
    users
      .find({
        where: {
          username: req.body.username,
          // password: req.body.password
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
              // console.log(err, data);
            })
            res.json({ success: true, token: 'JWT ' + token, User: user });
          } else {
            res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
          }
        })
      })
      .catch((error) => res.status(400).send(error));
  });
};

module.exports = { routes };

