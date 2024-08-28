// src/services/measureService/measureService.ts
import { PrismaClient } from '@prisma/client';
import * as customerService from './customerService';
import * as measureTypeService from './measureTypeService';
import { handleImageUpload } from '../geminiAI/main';

const prisma = new PrismaClient();

export async function createMeasure(data: {
  base64Image: string;
  customerCode: string;
  customerName?: string;
  measureDatetime: Date;
  measureType: string;
}) {
  const validMeasureTypes = ['WATER', 'GAS'];

  // Validar tipo de medição
  if (!validMeasureTypes.includes(data.measureType.toUpperCase())) {
    throw new Error("INVALID_TYPE");
  }

  // Buscar ou criar o cliente
  let customer = await customerService.findCustomerByCode(data.customerCode);

  if (!customer) {
    customer = await customerService.createCustomer(data.customerCode, data.customerName || '');
  }

  // Buscar ou criar o tipo de medição
  let measureTypeRecord = await measureTypeService.findMeasureTypeByType(data.measureType);

  if (!measureTypeRecord) {
    measureTypeRecord = await measureTypeService.createMeasureType(data.measureType);
  }

  // Verificar se já existe uma medição no mês
  const existingMeasure = await prisma.measure.findFirst({
    where: {
      customerId: customer.id,
      measureTypeId: measureTypeRecord.id,
      measureDatetime: {
        gte: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      },
    },
  });

  if (existingMeasure) {
    throw new Error("DOUBLE_REPORT");
  }

  const { imageUrl, measureValue, measureUuid } = await handleImageUpload(data.base64Image);

  return await prisma.measure.create({
    data: {
      id: measureUuid,
      customer: {
        connect: { id: customer.id },
      },
      measureDatetime: data.measureDatetime,
      measureType: {
        connect: { id: measureTypeRecord.id },
      },
      measureValue,
      imageUrl,
    },
  });
}

export async function confirmMeasure(measureUuid: string, confirmedValue: number) {
    const measure = await prisma.measure.findUnique({
      where: { id: measureUuid },
      include: { customer: true },
    });
  
    if (!measure) {
      throw new Error("MEASURE_NOT_FOUND");
    }
  
    if (measure.hasConfirmed) {
      throw new Error("CONFIRMATION_DUPLICATE");
    }
  
    await prisma.measure.update({
      where: { id: measureUuid },
      data: {
        hasConfirmed: true,
      },
    });
  }

export async function listMeasures(customerCode: string, measureType?: string) {
  const customer = await customerService.findCustomerByCode(customerCode);

  if (!customer) {
    throw new Error("CUSTOMER_NOT_FOUND");
  }

  const whereCondition: any = { customerId: customer.id };

  if (measureType) {
    const measureTypeRecord = await measureTypeService.findMeasureTypeByType(measureType);

    if (!measureTypeRecord) {
      throw new Error("MEASURE_TYPE_NOT_FOUND");
    }

    whereCondition.measureTypeId = measureTypeRecord.id;
  }

  const measures = await prisma.measure.findMany({
    where: whereCondition,
    include: { measureType: true },
    orderBy: {
      measureDatetime: 'desc',
    },
  });

  return measures;
}
