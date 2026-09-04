import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
    // Otimização: conexão compartilhada mantida pelo escopo global (já implementado)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
