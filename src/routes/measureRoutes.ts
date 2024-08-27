import express from 'express';
import { uploadMeasureController, confirmMeasureController, listMeasuresController } from '../controllers/measureController';

const router = express.Router();

router.post('/upload', uploadMeasureController);
router.patch('/confirm', confirmMeasureController);
router.get('/:customer_code/list', listMeasuresController);

export default router;
