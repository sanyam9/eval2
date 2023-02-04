const {getCSVData} = require('../utils/csvUtils');
const db = require('../../db/models');

async function getIdSector(urlLink){
  let parsedCSVData = await getCSVData(urlLink);
  parsedCSVData = parsedCSVData.map(item => { 
    return {
      id: item[0],
      sector:item[1]
    };
  });
  return parsedCSVData;
}

function createCompanies(companyList){
  return db.CompanyInfo.bulkCreate(companyList);
}

function insertScore(companyId, companyScore){
  return db.CompanyInfo.update(
    {score: companyScore},
    {
      where: {id: companyId}
    }
  );
}

function getOutput(){
  return db.CompanyInfo.findAll({
    attributes: ['id', 'name', 'score']
  });
}
module.exports = {
  getIdSector,
  createCompanies,
  insertScore,
  getOutput
};

