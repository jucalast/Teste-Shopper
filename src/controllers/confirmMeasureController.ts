import { Request, Response } from 'express';
import * as measureService from '../services/measureService';
import { handleErrors } from '../utils/errorHandler';

interface ConfirmMeasureRequestBody {
  measure_uuid: string;
  confirmed_value: number;
}

export async function confirmMeasure(req: Request<{}, {}, ConfirmMeasureRequestBody>, res: Response) {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    if (!measure_uuid || !confirmed_value) {
      return res.status(400).json({
        error_code: 'MISSING_FIELDS',
        error_description: 'Todos os campos são obrigatórios.',
      });
    }

    await measureService.confirmMeasure(measure_uuid, confirmed_value);
    res.status(200).json({ success: true });
  } catch (error) {
    handleErrors(error as Error, res);
  }
}
