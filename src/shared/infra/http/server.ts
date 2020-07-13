import 'reflect-metadata';
import 'dotenv/config';

import app from './app';

import '@shared/infra/typeorm';
import '@shared/container';

app.listen(process.env.PORT, () => {
  if (process.env.ENVIRONMENT === 'develop') {
    console.log(`Listening at port: ${process.env.PORT}`);
  }
});
