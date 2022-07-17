'use strict';

let { start } = require('./src/server');
let { sequelize } = require('./src/auth/models/index')

sequelize.sync()
  .then(() => console.log('successfully connected to database'))
  .catch((e) => console.error(e.message));

start();