import express from 'express';
import { getInteractionsForPastor } from './interactions.controller';

const router = express.Router();

router.get('/:pastorId/interactions', getInteractionsForPastor);

export default router;
