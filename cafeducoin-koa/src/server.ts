// Env vars config
import dotenv from 'dotenv';
dotenv.config();

import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import cors from 'koa2-cors';
import logger from 'koa-logger';
import config from './config';
import dbClient from './db/database-client';
import Router from './routes';

// Database connection
dbClient.connectToDatabase();

const app = new Koa();

app.use(bodyParser());
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger());

// Routers declaration
app.use(Router.routes()).use(Router.allowedMethods());

const PORT = config.port;
const server = app
  .listen(+PORT, '0.0.0.0', () => {
    console.log(`Listening to port ${PORT} ...`);
  })
  .on('error', (error) => {
    console.error(error);
  });

export default server;
