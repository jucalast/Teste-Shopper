import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function validateMeasureNotExist(customerCode: string, measureDatetime: Date, measureType: string): Promise<boolean> {
    const measure = await prisma.measure.findFirst({
        where: {
            customerCode,
            measureDatetime: {
                gte: new Date(measureDatetime.getFullYear(), measureDatetime.getMonth(), 1),
                lt: new Date(measureDatetime.getFullYear(), measureDatetime.getMonth() + 1, 1),
            },
            measureType
        }
    });
    return measure === null;
}

export async function validateMeasureExists(measureId: string): Promise<boolean> {
    // Supondo que 'id' é o campo único no seu modelo Prisma
    const measure = await prisma.measure.findUnique({ where: { id: measureId } });
    return measure !== null;
}

export async function validateMeasureConfirmed(measureId: string): Promise<boolean> {
    // Supondo que 'id' é o campo único no seu modelo Prisma
    const measure = await prisma.measure.findUnique({ where: { id: measureId } });
    return measure ? measure.hasConfirmed : false; // Corrigido para 'hasConfirmed'
}
