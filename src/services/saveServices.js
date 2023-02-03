const {getCSVData} = require('../utils/csvUtils');
const db = require('../../db/models');

async function createCompanySectors(urlLink){
  let parsedCSVData = await getCSVData(urlLink);
  parsedCSVData = parsedCSVData.map(item => { 
    return {
      companyId: item[0],
      companySector:item[1]
    };
  });
  console.log(parsedCSVData);
  let tasks = await db.Sectors.bulkCreate(parsedCSVData);
  console.log(tasks);
}

module.exports = {
  createCompanySectors
};

