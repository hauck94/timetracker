// tslint:disable-next-line: no-var-requires
require('dotenv-safe').config();
import 'reflect-metadata';
import { createDatabaseConnection } from './util/createDatabaseConnection';
import * as bodyParser from 'body-parser';
import { globalRouter } from './router/global.router';
import express from 'express';

const port: number = Number(process.env.PORT);

export const startServer = async () => {
  try {
    const app = express();
    const dbConnection = await createDatabaseConnection();

    app.use(bodyParser.json());

    app.use('/api', globalRouter);

    const server = app.listen(port, () => console.log(`Server is running on port ${port}`));
    return {
      dbConnection,
      server,
    };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

// tslint:disable-next-line: no-floating-promises
startServer();
