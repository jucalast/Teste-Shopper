import { PrismaClient } from '@prisma/client';
import { uploadImage } from './geminiService';

const prisma = new PrismaClient();

export async function createMeasure(data: { base64Image: string; customerCode: string; measureDatetime: Date; measureType: string }) {
  const existingMeasure = await prisma.measure.findFirst({
    where: {
      customerCode: data.customerCode,
      measureType: data.measureType,
      measureDatetime: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
      }
    }
  });

  if (existingMeasure) {
    throw new Error('DOUBLE_REPORT');
  }

  const { imageUrl, measureValue, measureUuid } = await uploadImage(data.base64Image);

  return await prisma.measure.create({
    data: {
      id: measureUuid,
      customerCode: data.customerCode,
      measureDatetime: data.measureDatetime,
      measureType: data.measureType,
      measureValue,
      imageUrl,
    },
  });
}

export async function confirmMeasure(measureUuid: string, confirmedValue: number) {
  const measure = await prisma.measure.findUnique({
    where: { id: measureUuid },
  });

  if (!measure) {
    throw new Error('MEASURE_NOT_FOUND');
  }

  if (measure.hasConfirmed) {
    throw new Error('CONFIRMATION_DUPLICATE');
  }

 
