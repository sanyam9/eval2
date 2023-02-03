const saveServices = require('../services/saveServices');

const postSaveController = async (req,res) => {
  const {urlLink} = req.body;
  saveServices.createCompanySectors(urlLink);
  res.status(200).json(urlLink);
};

module.exports = {postSaveController};