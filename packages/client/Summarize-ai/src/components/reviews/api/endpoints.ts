export const ENDPOINTS = {
  GET_REVIEWS: (id: number) => `/api/products/${id}/reviews`,
  SUMMARIZE_REVIEWS: (id: number) => `/api/products/${id}/reviews/summarize`,
  GET_PRODUCTS: `/api/products`,
};
