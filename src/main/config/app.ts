import express from 'express';
import setupMiddlewares from './middlewares';
import setupRouts from './routes';
import setupSwagger from './config-swagger';

const app = express();
setupSwagger(app);
setupMiddlewares(app);
setupRouts(app);

export default app;
