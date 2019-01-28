import Sequelize from 'sequelize';
import databaseConnection from '../setup/databaseConnection';

const models = {
  Users: databaseConnection.import('./users.js')
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models);
  }
});

models.sequelize = databaseConnection;
models.Sequelize = Sequelize;

export default models;
