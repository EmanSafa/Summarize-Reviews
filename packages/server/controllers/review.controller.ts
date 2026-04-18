import type { Request, Response } from "express";
import { ReivewService } from "../services/review.services";
import { productRepo } from "../repositories/product.reposatoriy";
import { reviewRepo } from "../repositories/reivew.Repo";

export const reviewController = {
  getReviewsController: async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const product = await productRepo.getProduct(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    try {
      const reviews = await ReivewService.getReviews(productId);
      return res.json(reviews);
    } catch (err: any) {
      return res
        .status(500)
        .json({ error: err.message, stack: err.stack, module: "error info" });
    }
  },
  summarizeReviews: async (req: Request, res: Response) => {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }
    const product = await productRepo.getProduct(productId);
    if (!product) {
      return res.status(400).json({ error: "Product not found" });
    }
    const reviews = await reviewRepo.getReviews(productId, 1);
    if (!reviews.length) {
      return res.status(400).json({ error: "No reviews found to summarize" });
    }
    try {
      const summary = await ReivewService.summarizeReviews(productId);
      return res.json({ summary });
    } catch (err: any) {
      return res
        .status(500)
        .json({ error: err.message, stack: err.stack, module: "error info" });
    }
  },
};
