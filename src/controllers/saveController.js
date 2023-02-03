const companyServices = require('../services/companyServices');
const { default: axios } = require('axios');

const postSaveController = async (req,res) => {
  const {urlLink} = req.body;
  let companies = await companyServices.getIdSector(urlLink);
  
  for(let i = 0 ; i<companies.length ; i++){
    let qId = companies[i].id;
    const getRes = await axios.get(`http://54.167.46.10/company/${qId}`);
    companies[i] = {...getRes.data, 'sector':companies[i].sector};
    delete companies[i].tags;
    delete companies[i].description;
  }
  
  await companyServices.createCompanies(companies);
  res.status(200).json(urlLink);
};

module.exports = {postSaveController};

