import express from 'express';
import cors from 'cors';
import http from 'http';
import { fireflyInit } from './clients/firefly';
import tokensRouter from './routers/tokens';
import storageRouter from './routers/storage';

export const start = async () => {
  await fireflyInit();

  const app = express();
  app.use(cors());
  app.use(express.urlencoded({extended: true}));
  app.use(express.json());

  app.use('/api/v1/tokens', tokensRouter);
  app.use('/api/v1/storage', storageRouter);
  const server = new http.Server(app);

  server.listen(3000, () => {
    console.log('Server is listening on port 3000');
  });

  const close = () => {
    server.close(err => {
      if (err) {
        console.error('Error closing server', err);
      } else {
      console.log('Server closed');
      }
    });
  };

  return { app, close };
}