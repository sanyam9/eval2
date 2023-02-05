const router = require('express').Router();
const saveController = require('../controllers/saveController');
const companyController = require('../controllers/companyController');

router.route('/save')
  .post(saveController.postSaveController);

router.route('/companies')
  .get(companyController.getCompaniesBySector);

module.exports = router;