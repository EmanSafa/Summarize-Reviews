import { Router, type Request, type Response } from "express";
import { reviewController } from "./controllers/review.controller";
const router = Router();


router.get("/", (req, res) => {
    res.send("Hello World!");
});

router.get('/api/products/:id/reviews', reviewController.getReviewsController)
router.post('/api/products/:id/reviews/summarize', reviewController.summarizeReviews)

export default router;