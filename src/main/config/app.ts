import express from 'express';
import setupMiddlewares from './middlewares';
import setupRouts from './routes';
import setupStaticFiles from './static-files';
import setupSwagger from './config-swagger';

const app = express();
setupStaticFiles(app);
setupSwagger(app);
setupMiddlewares(app);
setupRouts(app);

export default app;
