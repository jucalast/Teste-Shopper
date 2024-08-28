// src/utils/errorHandler.ts

import { Response } from 'express';

export function handleErrors(error: unknown, res: Response) {
  console.error('Error:', error);

  if (error instanceof Error) {
    // Tratar erros conhecidos
    switch (error.message) {
      case 'DOUBLE_REPORT':
        res.status(409).json({ error_code: 'DOUBLE_REPORT', error_description: 'Leitura do mês já realizada' });
        break;
      case 'MEASURE_NOT_FOUND':
        res.status(404).json({ error_code: 'MEASURE_NOT_FOUND', error_description: 'Leitura não encontrada' });
        break;
      case 'CONFIRMATION_DUPLICATE':
        res.status(409).json({ error_code: 'CONFIRMATION_DUPLICATE', error_description: 'Leitura já confirmada' });
        break;
      default:
        res.status(500).json({ error_code: 'UNKNOWN_ERROR', error_description: 'Erro desconhecido' });
        break;
    }
  } else {
    res.status(500).json({ error_code: 'UNKNOWN_ERROR', error_description: 'Erro desconhecido' });
  }
}
