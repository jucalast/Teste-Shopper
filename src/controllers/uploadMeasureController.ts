import { Request, Response } from 'express';
import * as measureService from '../services/measureService/measureService';
import { handleErrors } from '../utils/errorHandler';

export async function uploadMeasure(req: Request, res: Response) {
  try {
    const { image, customer_code, measure_datetime, measure_type, customer_name } = req.body;

    // Verificar se todos os campos obrigatórios estão presentes
    if (!image || !customer_code || !measure_datetime || !measure_type) {
      return res.status(400).json({
        error_code: 'MISSING_FIELDS',
        error_description: 'Todos os campos são obrigatórios.',
      });
    }

    // Validar o formato da imagem
    if (typeof image !== 'string' || !/^data:image\/[a-z]+;base64,.+$/i.test(image)) {
      return res.status(400).json({
        error_code: 'INVALID_IMAGE_FORMAT',
        error_description: 'Formato da imagem inválido.',
      });
    }

    // Validar o código do cliente (deve ser uma string)
    const customerCodeStr = String(customer_code);
    


    // Validar o tipo de medição
    const validMeasureTypes = ['WATER', 'GAS'];
    if (!validMeasureTypes.includes(measure_type.toUpperCase())) {
      return res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitido.',
      });
    }

    // Chamar o serviço para criar a medição
    const measure = await measureService.createMeasure({
      base64Image: image,
      customerCode: customerCodeStr,
      measureDatetime: measure_datetime,
      measureType: measure_type,
      customerName: customer_name, // Opcionalmente passado
    });

    // Responder com sucesso
    res.status(200).json({
      image_url: measure.imageUrl,
      measure_value: measure.measureValue,
      measure_uuid: measure.id,
    });
  } catch (error) {
    console.error('Error in uploadMeasure:', error); // Adicione esta linha para rastrear o erro
    handleErrors(error as Error, res);
  }
}
