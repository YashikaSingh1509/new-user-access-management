require('dotenv').config();
require('reflect-metadata');
const express = require('express');
const AppDataSource = require('./data-source');
const routes = require('./routes');

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log('PostgreSQL DB connected');

    app.use('/api', routes);

    const port = process.env.PORT || 3000;
    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error('DB connection error:', error);
  });
