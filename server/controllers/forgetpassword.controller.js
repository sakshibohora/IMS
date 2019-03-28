const db = require('../models/index.js');
var Sequelize = require('sequelize');
var crypto = require('crypto');
const nodemailer = require('nodemailer')
const users = db.Users
const Op = Sequelize.Op;



exports.forgotPassword = async function (req, res) {
  if (req.body.email === '') {
    res.status(400).send('email required');
  }
  else{
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
        resetPasswordExpires: Date.now() + 3600000,
      });
      // console.log(resetPasswordExpires);
      var transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'sakshi.bohora@bacancytechnology.com',//valid email id, for testing purpose only
          pass: 'Saxi@bacancy' //valid password, for testing purpose only
        }
      });

      var mailOptions = {
        from: 'sakshi.bohora@bacancytechnology.com',
        to: `${user.email}`,
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
}
}

exports.resetpassword = async function (req, res) {
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
};
exports.updatePasswordViaEmail = async function (req, res) {
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
}