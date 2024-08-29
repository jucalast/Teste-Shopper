import express from 'express';
import measureRoutes from './routes/measureRoutes';

const app = express();

app.use(express.json());
app.use('/', measureRoutes);

export default app;
