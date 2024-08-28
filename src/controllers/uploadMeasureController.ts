import { Request, Response } from 'express';
import * as measureService from '../services/measureService';
import { handleErrors } from '../utils/errorHandler';

export async function uploadMeasure(req: Request, res: Response) {
  try {
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    if (!image || !customer_code || !measure_datetime || !measure_type) {
      return res.status(400).json({
        error_code: 'MISSING_FIELDS',
        error_description: 'Todos os campos são obrigatórios.',
      });
    }

    const measureDate = new Date(measure_datetime);
    if (isNaN(measureDate.getTime())) {
      return res.status(400).json({
        error_code: 'INVALID_DATE',
        error_description: 'Data inválida fornecida.',
      });
    }

    const measure = await measureService.createMeasure({
      base64Image: image,
      customerCode: customer_code,
      measureDatetime: measureDate,
      measureType: measure_type,
    });

    res.status(200).json({
      image_url: measure.imageUrl,
      measure_value: measure.measureValue,
      measure_uuid: measure.id,
    });
  } catch (error) {
    handleErrors(error as Error, res);
  }
}
