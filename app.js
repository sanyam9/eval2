const express = require('express');

const app = express();
const PORT = 3001;

app.use(express.json());

app.use('/api', require('./src/routes/saveRoute'));


app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server running successfullt at port ${PORT}`);
  }
  else {
    console.log('Error occurred! Server failed to run');
  }
});