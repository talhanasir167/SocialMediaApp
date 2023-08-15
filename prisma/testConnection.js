const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function connectPrisma() {
  let users;
  try {
    // users = await prisma.user.findMany();
    console.log('Prisma Connected');
  } catch (err) {
    console.error('Error', err);
  } finally {
    await prisma.$disconnect();
  }
  return users;
}

module.exports = connectPrisma;
