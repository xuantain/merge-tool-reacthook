const dotenv = require('dotenv');

dotenv.config();

const { DB_HOST, DB_PORT, DB_USERNAME, DB_PASSWORD, DB_DATABASE, NODE_ENV } = process.env;

module.exports = {
  name: 'default',
  type: 'mysql',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [__dirname + 'backend/schema/**/*.entity.ts'],
  synchronize: NODE_ENV === 'production' ? false : true,
  logging: false,
  migrations: [__dirname + 'backend/database/migration'],
  subscribers: [__dirname + 'backend/database/subscriber'],
  cli: {
    migrationsDir: 'backend/database/migration',
    subscribersDir: 'backend/database/subscriber'
  }
};
