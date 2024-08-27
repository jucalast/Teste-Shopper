import express from 'express';
import bodyParser from 'body-parser';
import measureRoutes from './routes/measureRoutes';

const app = express();
app.use(bodyParser.json());
app.use('/api/measures', measureRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
