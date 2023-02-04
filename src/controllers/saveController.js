const companyServices = require('../services/companyServices');
const { default: axios } = require('axios');

const postSaveController = async (req,res) => {
  const {urlLink} = req.body;
  let companies = await companyServices.getIdSector(urlLink);

  for(let i = 0 ; i<companies.length ; i++){
    let qId = companies[i].id;
    const companyDetails = await axios.get(`http://54.167.46.10/company/${qId}`);
    companies[i] = {...companyDetails.data, 'sector':companies[i].sector};
    delete companies[i].tags;
    delete companies[i].description;
  }
  
  await companyServices.createCompanies(companies);
  const sectorList = new Set(companies.map(item => item.sector));
  for (const sector of sectorList ){
    const companyDetails = await axios.get(`http://54.167.46.10/sector?name=${sector}`);
    for (let company of companyDetails.data) {
      let metrics = {};
      company.performanceIndex.forEach(metricPair => {
        metrics[metricPair.key] = metricPair.value;
      });
      const score = ((metrics.cpi * 10) + (metrics.cf / 10000) + (metrics.mau * 10) + metrics.roic) / 4;
      await companyServices.insertScore(company.companyId, score);
    }
  }
  const output = await companyServices.getOutput();
  res.status(200).json(output);
};

module.exports = {postSaveController};

