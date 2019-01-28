import models from '../models';

export default function(app, callback) {
  console.info('SETUP|Syncing database tables...');
  models.sequelize.sync({})
    .then(() => {
      console.info('INFO|Database sync complete.');
      callback();
    })
    .catch((error) => {
      console.error(`ERROR|Unable to sync database - ${error}`);
      console.error('ERROR|Server not started.');
    });
}