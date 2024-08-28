// src/services/measureTypeService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function findMeasureTypeByType(type: string) {
  return await prisma.measureType.findUnique({
    where: { type: type.toUpperCase() },
  });
}

export async function createMeasureType(type: string) {
  return await prisma.measureType.create({
    data: {
      type: type.toUpperCase(),
    },
  });
}
