import { Response } from 'express';

export function handleErrors(error: Error, res: Response) {
  switch (error.message) {
    case "MISSING_FIELDS":
      res.status(400).json({
        error_code: 'MISSING_FIELDS',
        error_description: 'Todos os campos são obrigatórios.',
      });
      break;
    case "INVALID_DATE":
      res.status(400).json({
        error_code: 'INVALID_DATE',
        error_description: 'Data inválida fornecida.',
      });
      break;
    case "INVALID_TYPE":
      res.status(400).json({
        error_code: 'INVALID_TYPE',
        error_description: 'Tipo de medição não permitida',
      });
      break;
    case "DOUBLE_REPORT":
      res.status(409).json({
        error_code: 'DOUBLE_REPORT',
        error_description: 'Leitura do mês já realizada',
      });
      break;
    case "MEASURE_NOT_FOUND":
      res.status(404).json({
        error_code: 'MEASURE_NOT_FOUND',
        error_description: 'Leitura não encontrada',
      });
      break;
    case "CONFIRMATION_DUPLICATE":
      res.status(409).json({
        error_code: 'CONFIRMATION_DUPLICATE',
        error_description: 'Leitura já confirmada',
      });
      break;
    default:
      res.status(500).json({
        error_code: 'INTERNAL_SERVER_ERROR',
        error_description: 'Erro interno do servidor',
      });
  }
}
