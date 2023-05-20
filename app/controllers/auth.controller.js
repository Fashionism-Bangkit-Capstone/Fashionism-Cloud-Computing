const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');

exports.signup = (model) => (req, res) => {
  model
    .create({
      name: req.body.name,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      phone: req.body.phone,
      address: req.body.address,
    })
    .then(() => {
      res.status(201).send({
        error: false,
        message: 'You have successfully registered, please login!',
      });
    })
    .catch((err) => {
      res.status(500).send({ error: true, message: err.message });
    });
};

exports.signin = (model) => (req, res) => {
  model
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (!user) {
        return res
          .status(404)
          .send({ error: true, message: 'User not found.' });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password,
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          error: true,
          message: 'Incorrect password!',
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: '365d',
      });

      res.status(200).send({
        error: false,
        message: 'Login successful!',
        data: {
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken: token,
        },
      });
    })
    .catch((err) => {
      res.status(500).send({ error: true, message: err.message });
    });
};
