const { Router } = require('express');
const AuthController = require('../controllers/AuthController');
const { verifyToken }    = require('../middlewares/authJwt');
module.exports = (signInUseCase , refreshToken) => {
  const router = Router();
  const controller = new AuthController(signInUseCase, refreshToken);

  // POST /api/v1/auth/signin
  router.post('/signin', controller.signIn.bind(controller));
  router.post('/refresh', verifyToken ,controller.refreshToken.bind(controller));

  return router;
};