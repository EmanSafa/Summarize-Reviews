import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ENDPOINTS } from "./endpoints";
import type { Product, ReviewsResponse, SummaryResponse } from "../Types/types";
import axios from "axios";

const useGetReviews = (id: number) => {
  return useQuery({
    queryKey: ["reviews", id],
    queryFn: () =>
      axios
        .get<ReviewsResponse>(ENDPOINTS.GET_REVIEWS(id))
        .then((res) => res.data),
  });
};

const useSummarizeReviews = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: ["summary", id],
    mutationFn: () =>
      axios
        .post<SummaryResponse>(ENDPOINTS.SUMMARIZE_REVIEWS(id))
        .then((res) => res.data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["summary", id] });
    },
    onError: () => {
      queryClient.invalidateQueries({ queryKey: ["summary", id] });
    },
  });
};

const useGetProducts = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: () =>
      axios.get<Product[]>(ENDPOINTS.GET_PRODUCTS).then((res) => res.data),
  });
};

export { useGetReviews, useSummarizeReviews, useGetProducts };
