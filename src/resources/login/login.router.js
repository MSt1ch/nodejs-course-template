const router = require('express').Router();
const { catchErrors } = require('../../middlewares');
const User = require('../users/user.model');
const usersService = require('../users/user.service');

router.route('/').post(
  catchErrors(async (req, res) => {
    const { body } = req;
    const user = await usersService.findByLogin(body.login, body.password);
    const token = await user.generateAuthToken();
    res.status(200).json({ user: User.toResponse(user), token });
  })
);

module.exports = router;
