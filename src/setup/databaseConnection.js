// Imports
import { Sequelize } from 'sequelize';
import config from '../config';

// Load database config
const databaseConfigEnv = config.database[config.env];
const databaseOptions = {
  host: databaseConfigEnv.host,
  dialect: databaseConfigEnv.dialect,
  logging: false,
  operatorsAliases: Sequelize.Op
};

// Create new database connection
let connection = new Sequelize(
  databaseConfigEnv.database,  
  databaseConfigEnv.username, 
  databaseConfigEnv.password, 
  databaseOptions);

// Test connection
console.info('SETUP|Connecting database...');

connection
  .authenticate()
  .then(() => {
    console.info('INFO|Database connected.');
  })
  .catch(err => {
    console.error('ERROR|Unable to connect to the database:', err);
  });

export default connection;