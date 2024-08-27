import { Request, Response } from 'express';
import { uploadMeasure, confirmMeasure, listMeasures } from '../services/measureService';

export async function uploadMeasureController(req: Request, res: Response) {
    
    const { image, customer_code, measure_datetime, measure_type } = req.body;

    if (!image || !customer_code || !measure_datetime || !measure_type) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Dados inválidos" });
    }

    if (!['WATER', 'GAS'].includes(measure_type.toUpperCase())) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Tipo de medição inválido" });
    }

    const result = await uploadMeasure({
        image,
        customerCode: customer_code,
        measureDatetime: new Date(measure_datetime),
        measureType: measure_type.toUpperCase() as 'WATER' | 'GAS'
    });

    if (result.error_code) {
        return res.status(result.error_code === "DOUBLE_REPORT" ? 409 : 400).json(result);
    }

    return res.status(200).json(result);
}

export async function confirmMeasureController(req: Request, res: Response) {
    const { measure_uuid, confirmed_value } = req.body;

    if (!measure_uuid || !confirmed_value) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Dados inválidos" });
    }

    const result = await confirmMeasure({ measureUuid: measure_uuid, confirmedValue: confirmed_value });

    if (result.error_code) {
        return res.status(result.error_code === "MEASURE_NOT_FOUND" ? 404 : 409).json(result);
    }

    return res.status(200).json(result);
}

export async function listMeasuresController(req: Request, res: Response) {
    const { customer_code } = req.params;
    const { measure_type } = req.query;

    if (!customer_code) {
        return res.status(400).json({ error_code: "INVALID_DATA", error_description: "Código do cliente é obrigatório" });
    }

    let measureType: 'WATER' | 'GAS' | undefined;
    if (typeof measure_type === 'string') {
        measureType = measure_type.toUpperCase() as 'WATER' | 'GAS';
        if (!['WATER', 'GAS'].includes(measureType)) {
            return res.status(400).json({ error_code: "INVALID_TYPE", error_description: "Tipo de medição não permitido" });
        }
    }

    const result = await listMeasures(customer_code, measureType);

    if (result.error_code) {
        return res.status(result.error_code === "MEASURES_NOT_FOUND" ? 404 : 400).json(result);
    }

    return res.status(200).json(result);
}

