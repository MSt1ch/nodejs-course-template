const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { catchErrors } = require('../../middlewares/');

router
  .route('/')
  .get(
    catchErrors(async (req, res) => {
      const users = await usersService.getAll();
      // map user fields to exclude secret fields like "password"
      res.status(200).json(users.map(User.toResponse));
    })
  )
  .post(
    catchErrors(async (req, res, next) => {
      const newUser = await usersService.createNewUser(req.body);
      if (newUser) {
        return res.status(200).json(User.toResponse(newUser));
      }
      return next({ status: 400, message: 'Bad request' });
    })
  );

router
  .route('/:id')
  .get(
    catchErrors(async (req, res, next) => {
      const user = await usersService.getUserById(req.params.id);
      if (user) {
        return res.status(200).json(User.toResponse(user));
      }
      return next({ status: 404, message: 'User not found' });
    })
  )
  .put(
    catchErrors(async (req, res, next) => {
      const user = await usersService.updateUserById(req.params.id, req.body);
      if (user) {
        return res.status(200).json(User.toResponse(user));
      }
      return next({ status: 400, message: 'Bad request' });
    })
  )
  .delete(
    catchErrors(async (req, res, next) => {
      const user = await usersService.deleteUserById(req.params.id);
      if (user) {
        return res.status(204).json({ message: 'The user has been deleted' });
      }
      return next({ status: 404, message: 'User not found' });
    })
  );

module.exports = router;
