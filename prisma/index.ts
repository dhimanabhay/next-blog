import { PrismaClient } from "@prisma/client";

// let prisma: PrismaClient;
// declare global {
//   namespace NodeJS {
//     interface Global {
//       prisma: PrismaClient;
//     }
//   }
// }

// import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

// if (process.env.NODE_ENV === "production") {
//   prisma = new PrismaClient();
// } else {
//   let globalWithPrisma = global as typeof globalThis & {
//     prisma: PrismaClient;
//   };
//   if (!globalWithPrisma.prisma) {
//     globalWithPrisma.prisma = new PrismaClient();
//   }
//   prisma = globalWithPrisma.prisma;
// }

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient();
} else {
  if (!(global as any).prisma) {
    (global as any).prisma = new PrismaClient();
  }
  prisma = (global as any).prisma;
}



export default prisma;