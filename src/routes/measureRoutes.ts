import express from 'express';
import { uploadMeasure } from '../controllers/uploadMeasureController';
import { confirmMeasure } from '../controllers/confirmMeasureController';
import { listMeasures } from '../controllers/listMeasuresController';

const router = express.Router();

router.post('/upload', uploadMeasure);
router.patch('/confirm', confirmMeasure);
router.get('/:customer_code/list', listMeasures);

export default router;
