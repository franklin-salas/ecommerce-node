const express = require('express');
const router = express.Router();

module.exports = (clientController) => {
  router.get('/', (req, res) => clientController.getAll(req, res));
  router.post('/', (req, res) => clientController.create(req, res));
  return router;
};
