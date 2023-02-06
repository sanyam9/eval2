const csvUtils = require('../utils/csvUtils');
const db = require('../../db/models');
const { Sequelize } = require('../../db/models');

async function getIdSector(urlLink){
  let parsedCSVData = await csvUtils.getCSVData(urlLink);
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

function getTopCompanies(sector){
  return db.CompanyInfo.findAll({
    attributes: ['id', 'name', 'score',
      [Sequelize.literal('(RANK() OVER (ORDER BY score DESC))'), 'ranking']],
    where : {
      sector: sector
    }
  });
}

function updateCompany(idToUpdate, companyDetails){
  return db.CompanyInfo.update(companyDetails,{
    where: {
      id: idToUpdate
    },
    returning: true
  });
}

module.exports = {
  getIdSector,
  createCompanies,
  insertScore,
  getOutput,
  getTopCompanies,
  updateCompany
};

