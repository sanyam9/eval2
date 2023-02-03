const router = require('express').Router();
const saveController = require('../controllers/saveController');

router.route('/save')
  .post(saveController.postSaveController);

module.exports = router;