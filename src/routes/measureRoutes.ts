import { Router } from 'express';
import * as measureController from '../controllers/measureController';

const router = Router();

router.post('/upload', measureController.uploadMeasure);
router.patch('/confirm', measureController.confirmMeasure);
router.get('/:customer_code/list', measureController.listMeasures);

export default router;
