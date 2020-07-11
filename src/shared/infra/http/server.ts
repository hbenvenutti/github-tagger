import 'dotenv/config';

import app from './app';

import '@shared/infra/typeorm';

app.listen(process.env.PORT, () => {
  console.log(`Listening at port: ${process.env.PORT}`);
});
