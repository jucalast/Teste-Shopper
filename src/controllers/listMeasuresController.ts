import { Request, Response } from 'express';
import * as measureService from '../services/measureService';
import { handleErrors } from '../utils/errorHandler';

export async function listMeasures(req: Request, res: Response) {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    const measures = await measureService.listMeasures(customer_code, measure_type as string | undefined);

    if (measures.length === 0) {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhum registro encontrado',
      });
    }

    res.status(200).json({ customer_code, measures });
  } catch (error) {
    handleErrors(error as Error, res);
  }
}
