import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
export const productRepo = {
  getProduct: async (productId: number) => {
    return prisma.product.findUnique({ where: { id: productId } });
  },
  getProducts: async () => {
    return prisma.product.findMany({
      include: {
        reviews: true,
      },
      where: {
        reviews: {
          some: {
            id: {
              not: 0,
            },
          },
        },
      },
    });
  },
};
