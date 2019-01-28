import express from 'express';
import config from './config';
import bodyParser from 'body-parser';
import cors from 'cors';

import configurePassport from './setup/passport'; 
import configureHandlebars from './setup/handlebars';
import configureFrontdoor from './routers/frontdoor';
import configureRest from './routers/rest';
import syncDatabase from './setup/syncDatabase';

const app = express();
app.use(bodyParser.json());
app.use(cors());

configurePassport(app);
configureHandlebars(app);
configureFrontdoor(app);
configureRest(app);

syncDatabase(app, () => {
  console.info('SETUP|Starting server...');
  app.listen({ port: config.port }, (error) => {
    if (error) {
      console.error('ERROR|Unable to start server.');
    } else {
      console.info(`Server ready at http://localhost:${config.port}/api/`);
      console.info(`Frontdoor ready at http://localhost:${config.port}/`);
    }
  });
});
    