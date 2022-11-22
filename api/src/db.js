const { Sequelize } = require('sequelize');
const fs = require('fs');
const path = require('path');
const pg = require('pg');
const { db } = require('./config');


let sequelize = process.env.NODE_ENV === "production" ? new Sequelize({
  database: db.database,
  dialect: 'postgres',
  host: db.host,
  port: 5432,
  username: db.user,
  password: db.password,
  pool: {
    max: 3,
    min: 1,
    idle: 10000,
  },
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
    keepAlive: true,
  },
  ssl: true,
}) : new Sequelize(`postgres://${db.user}:${db.password}@${db.host}/${db.database}`, { logging: false, native: false });

const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
});

modelDefiners.forEach(model => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
sequelize.models = Object.fromEntries(capsEntries);

const { Tasks } = sequelize.models;

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize,     // para importart la conexión { conn } = require('./db.js');
};