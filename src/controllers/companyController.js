const companyServices = require('../services/companyServices');

const getCompaniesBySector = async (req, res) => {
  const {sector} = req.query;
  const companies = await companyServices.getTopCompanies(sector);
  res.status(200).json(companies);
};

module.exports = {
  getCompaniesBySector
};