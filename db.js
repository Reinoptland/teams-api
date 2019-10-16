const Sequelize = require('sequelize');
// eslint-disable-next-line no-undef
const databaseUrl = process.env.DATABASE_URL || 'postgres://postgres:secret@localhost:5432/postgres';

const db = new Sequelize(databaseUrl);

db
  .sync()
  .then(() => {
    console.log('Database schema has been updated.');
  })
  .catch(console.error);

module.exports = db;
