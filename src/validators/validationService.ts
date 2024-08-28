import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function validateMeasureNotExist(customerCode: string, measureDatetime: Date, measureType: string): Promise<boolean> {
    // Primeiro, buscar o ID do tipo de medição
    const measureTypeRecord = await prisma.measureType.findUnique({
        where: { type: measureType.toUpperCase() },
    });

    if (!measureTypeRecord) {
        throw new Error("MEASURE_TYPE_NOT_FOUND");
    }

    // Buscar a medição com o ID do tipo de medição
    const measure = await prisma.measure.findFirst({
        where: {
            customer: { code: customerCode },
            measureDatetime: {
                gte: new Date(measureDatetime.getFullYear(), measureDatetime.getMonth(), 1),
                lt: new Date(measureDatetime.getFullYear(), measureDatetime.getMonth() + 1, 1),
            },
            measureTypeId: measureTypeRecord.id, // Usar o ID do tipo de medição
        }
    });

    return measure === null;
}
