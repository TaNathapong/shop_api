const bodyParser = require('body-parser');
const cookie = require('cookie-session');
const access = require('access-control');
const express = require('express');
const helmet = require('helmet');
const logger = require('morgan');
const moment = require('moment');
const cors = require('cors');
const fs = require('fs');
const date = moment().format('DD-MM-YYYY');
const time = moment().format('HH: mm: ss');
const core = access({ maxAge: '8 hour', credentials: true, origin: true });
const { initialize } = require('./config/socket/index');

require('dotenv').config();
require('./knex');

const app = express();
const port = process.env.PORT || 3098;
const version = '/api/v1/';

// helmet
app.use(helmet());

// cors
app.use(core);
app.use(
  cors({
    optionsSuccessStatus: 200,
    preflightContinue: true,
    credentials: true
  })
);

// body parser
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));

// trust proxy
app.set('trust proxy', 1);

// cookie
app.use(
  cookie({
    name: 'shop_session',
    keys: ['shop'],
    maxAge: 8 * 60 * 60 * 1000,
    cookie: {
      httpOnly: true,
      secure: true
    }
  })
);

// log
app.use(logger('dev'));
var accessLogStream = fs.createWriteStream(`${__dirname}/logs/${date}.log`, {
  flags: 'a'
});
var configlog = `[${time}] [ip]: :remote-addr :remote-user [method]: :method [url]: :url HTTP/:http-version [status]: :status [response-time]: :response-time ms [client]: :user-agent`;
app.use(logger(configlog, { stream: accessLogStream }));

// route
const user = require('./routes/user');

app.use(version + 'user', user);

const server = app.listen(port, function() {
  console.log('Server is running port: ' + port);
});

const io = require('socket.io')(server);
initialize(io);
