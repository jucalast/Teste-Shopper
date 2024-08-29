import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function resetDatabase() {
  try {
    // Inicie uma transação para garantir a integridade dos dados
    await prisma.$transaction(async (prisma) => {
      // Apague todas as entradas nas tabelas, começando pelas tabelas que têm dependências
      await prisma.measure.deleteMany();
      await prisma.measureType.deleteMany();
      await prisma.customer.deleteMany();
      
      console.log('Banco de dados resetado com sucesso');
    });
  } catch (error) {
    console.error('Erro ao resetar o banco de dados:', error);
  } finally {
    // Feche a conexão com o banco de dados
    await prisma.$disconnect();
  }
}

// Execute o script
resetDatabase();
