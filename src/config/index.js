import dotenv from 'dotenv';
dotenv.config();

export default {
  database: {
    development: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'myapi_dev',
      host: 'localhost',
      dialect: 'mysql'
    },
    test: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: 'myapi_test',
      host: 'localhost',
      dialect: 'mysql'
    },
    production: {
      url: process.env.JAWSDB_URL,
      dialetc: 'mysql'
    }
  },
  clients: [
    {
      id: process.env.JIBAGA_ID,
      secret: process.env.JIBAGA_SECRET
    }
  ],
  port: process.env.PORT || 9000,
  sessionSecret: process.env.SESSION_SECRET,
  env: process.env.NODE_ENV || 'development'
};