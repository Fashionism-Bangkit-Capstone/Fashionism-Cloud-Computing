const checkDuplicateEmail = (model) => (req, res, next) => {
  model
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user) => {
      if (user) {
        res.status(400).send({
          error: true,
          message: 'Failed! Email is already in use!',
        });
        return;
      }

      next();
    });
};

const verifySignUp = {
  checkDuplicateEmail,
};

module.exports = verifySignUp;
