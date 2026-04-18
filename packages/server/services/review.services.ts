import { reviewRepo } from "../repositories/reivew.Repo";
import { llmClient } from "../LLMs/client";
import template from "../prompts/summarize-reivews.txt";
export const ReivewService = {
  summarizeReviews: async (productId: number) => {
    const existingSummaries = await reviewRepo.getReviewSummary(productId);
    if (existingSummaries) {
      return existingSummaries;
    }
    const summaries = await reviewRepo.getReviews(productId, 10);
    const jointSummaries = summaries.map((review) => review.content).join("\n");
    //send to open ai to summarize
    const prompt = template.replace("{{reviews}}", jointSummaries);
    const response = await llmClient.generateText({
      prompt,
    });
    const summary = response.text;
    //store the answer in cache
    await reviewRepo.storeReivewSummary(productId, summary);
    return summary;
  },
};
