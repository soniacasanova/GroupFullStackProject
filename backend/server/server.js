require("dotenv").config();

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const config = require("./config");
const { errorHandler } = require('./common/errors');
const db = require('./common/db');

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

//app.use(express.static('../../frontend/dist'));

require('./entities/valuers/valuers.routes').addRoutesTo(app);
require('./entities/proceedings/proceedings.routes').addRoutesTo(app);
require('./entities/visits/visits.routes').addRoutesTo(app);

app.use(errorHandler);

const startServer = async () => {
  await db.connect();
  app.listen(config.port, () => {
    console.log(`Sevad Server listening on http://localhost:${config.port}`)
  });
}

startServer();