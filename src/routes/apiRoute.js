const router = require('express').Router();
const saveController = require('../controllers/saveController');
const companyController = require('../controllers/companyController');

router.route('/save')
  .post(saveController.postSaveController);

router.route('/companies')
  .get(companyController.getCompaniesBySector);

router.route('/company/:id')
  .patch(companyController.patchCompanyDetails);

module.exports = router;