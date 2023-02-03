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

async function createCompanies(companyList){
  console.log(companyList);
  return db.CompanyInfo.bulkCreate(companyList);
}


// function getAllCompanyIds(){
//   return db.companySectors.findAll({
//     attribute: ['companyId']
//   }).then(function(ids){
//     return ids;
//   });
// }

module.exports = {
  getIdSector,
  createCompanies
};

