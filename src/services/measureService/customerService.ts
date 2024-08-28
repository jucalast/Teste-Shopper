// src/services/customerService.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function createCustomer(code: string, name: string) {
  return await prisma.customer.create({
    data: {
      code,
      name,
    },
  });
}

export async function findCustomerByCode(code: string) {
  return await prisma.customer.findUnique({
    where: { code },
  });
}
