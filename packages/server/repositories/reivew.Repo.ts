import dayjs, { Dayjs } from "dayjs";
import { PrismaClient } from "../generated/prisma";
const prisma = new PrismaClient();
type SummaryUpdateInput = {
  content: string;
  expiresAt: Date;
  generatedAt: Date;
  productId: number;
};
export const reviewRepo = {
  getReviews: async (productId: number, limit: number = 10) => {
    const reviews = await prisma.review.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return reviews;
  },

  storeReivewSummary: (productId: number, summary: string) => {
    const expiresAt = dayjs().add(7, "day").toDate();
    const now = new Date();
    const data: SummaryUpdateInput = {
      content: summary,
      expiresAt,
      generatedAt: now,
      productId,
    };
    return prisma.summary.upsert({
      where: { productId },
      update: data,
      create: data,
    });
  },

  getReviewSummary: (productId: number) => {
    return prisma.summary.findUnique({ where: { productId } });
  },
};
