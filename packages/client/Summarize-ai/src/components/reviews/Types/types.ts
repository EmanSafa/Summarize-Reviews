export type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
};

export type Review = {
  id: number;
  author: string;
  rating: number;
  content: string;
  productId: number;
  createdAt: Date;
};
export type ReviewsResponse = {
  reviews: Review[];
  summary: string;
};
export type SummaryResponse = {
  summary: string;
};
export type Summary = {
  id: number;
  productId: number;
  content: string;
  generatedAt: Date;
  expiresAt: Date;
};
