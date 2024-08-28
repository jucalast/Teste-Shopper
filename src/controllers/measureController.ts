// src/controllers/measureController.ts

import { Request, Response } from 'express';
import * as measureService from '../services/measureService';
import { handleErrors } from '../utils/errorHandler';

interface ConfirmMeasureRequestBody {
  measure_uuid: string;
  confirmed_value: number;
}

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
    handleErrors(error as Error, res); // Assegure-se de que error seja do tipo Error
  }
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
    handleErrors(error as Error, res); // Assegure-se de que error seja do tipo Error
  }
}

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
    handleErrors(error as Error, res); // Assegure-se de que error seja do tipo Error
  }
}
