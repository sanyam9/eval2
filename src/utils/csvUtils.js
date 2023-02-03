const parseCSV = (data) => {
  const csvData = [];

  const lines = data.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    csvData[i] = lines[i].split(',');
  }
  return csvData;
};

const getCSVData = async (urlLink) => {
  const csvRes = await fetch(urlLink, {
    method: 'get',
    headers: {
      'content-type': 'text/csv;charset=UTF-8',
    }
  });

  if(csvRes.status === 200){
    const data = await csvRes.text();
    const parsedCSVData = parseCSV(data).slice(1,);
    return parsedCSVData;
  }
  else{
    throw new Error(csvRes.status);
  }
};
module.exports = {
  getCSVData
};