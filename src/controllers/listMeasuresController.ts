import { Request, Response } from 'express';
import * as measureService from '../services/measureService/measureService';
import { handleErrors } from '../utils/errorHandler';

export async function listMeasures(req: Request, res: Response) {
  try {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    // Validação do parâmetro measure_type
    if (measure_type && !['WATER', 'GAS'].includes((measure_type as string).toUpperCase())) {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitido',
      });
    }

    const measures = await measureService.listMeasures(customer_code, measure_type as string | undefined);

    if (measures.length === 0) {
      return res.status(404).json({
        error_code: 'MEASURES_NOT_FOUND',
        error_description: 'Nenhuma leitura encontrada',
      });
    }

    res.status(200).json({
      customer_code,
      measures: measures.map(measure => ({
        measure_uuid: measure.id,
        measure_datetime: measure.measureDatetime,
        measure_type: measure.measureType.type,  // Acessando o tipo do MeasureType
        has_confirmed: measure.hasConfirmed,
        image_url: measure.imageUrl,
      })),
    });
  } catch (error) {
    handleErrors(error as Error, res);
  }
}
