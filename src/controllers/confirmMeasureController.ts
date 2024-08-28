import { Request, Response } from 'express';
import * as measureService from '../services/measureService/measureService';
import { handleErrors } from '../utils/errorHandler';

interface ConfirmMeasureRequestBody {
  measure_uuid: string;
  confirmed_value: number;
}

export async function confirmMeasure(req: Request<{}, {}, ConfirmMeasureRequestBody>, res: Response) {
  try {
    const { measure_uuid, confirmed_value } = req.body;

    // Verifica se todos os campos obrigatórios estão presentes
    if (!measure_uuid || confirmed_value === undefined) {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Todos os campos são obrigatórios.',
      });
    }

    // Verifica o tipo dos campos
    if (typeof measure_uuid !== 'string' || typeof confirmed_value !== 'number') {
      return res.status(400).json({
        error_code: 'INVALID_DATA',
        error_description: 'Tipo de dados inválido.',
      });
    }

    // Tenta confirmar a medição
    await measureService.confirmMeasure(measure_uuid, confirmed_value);
    res.status(200).json({ success: true });
  } catch (error) {
    handleErrors(error as Error, res);
  }
}
