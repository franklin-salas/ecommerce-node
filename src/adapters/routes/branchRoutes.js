const express = require('express');
const router = express.Router();

module.exports = (branchController) => {
  router.get('/', (req, res) => branchController.getAll(req, res));
  router.post('/', (req, res) => branchController.create(req, res));
  return router;
};
