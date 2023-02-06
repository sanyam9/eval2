const companyServices = require('../services/companyServices');

const getCompaniesBySector = async (req, res) => {
  const {sector} = req.query;
  const companies = await companyServices.getTopCompanies(sector);
  res.status(200).json(companies);
};

const patchCompanyDetails = async (req, res) => {
  const {id: idToUpdate} = req.params;
  const companyDetails = req.body;
  let updatedCompany = await companyServices.updateCompany(idToUpdate, companyDetails);
  if(updatedCompany[0] === 1){
    updatedCompany = updatedCompany[1][0];
    delete updatedCompany.dataValues.tags;
    delete updatedCompany.dataValues.description;
    res.status(200).json(updatedCompany); 
  }
  else{
    res.status(400).json({error: 'Bad Request'});
  }
};

module.exports = {
  getCompaniesBySector,
  patchCompanyDetails
};