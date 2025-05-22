const { DataSource } = require('typeorm');
const User = require('./entities/User');
const Software = require('./entities/Software');
const Request = require('./entities/Request');
require('dotenv').config();

const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: +process.env.DB_PORT || 5432,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  synchronize: true, 
  logging: false,
  entities: [User, Software, Request],
});

module.exports = AppDataSource;
