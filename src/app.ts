import express from 'express';
import bodyParser from 'body-parser';
import interactionsRoutes from './interactions/interactions.routes'

const app = express();

app.use(bodyParser.json());

app.use('/api/pastors', interactionsRoutes);

export default app;
