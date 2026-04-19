import { useGetReviews, useSummarizeReviews } from "./api/api";
import ReivewSkeleton from "./ReivewSkeleton";
import StarRating from "./StarRating";

import { HiSparkles } from "react-icons/hi2";

interface Props {
  productId: number;
}
const ReivewsList = ({ productId }: Props) => {
  const { data: reviews, isLoading, error } = useGetReviews(productId);
  const {
    mutate: summarizeReviews,
    data: summarizeResponse,
    isPending: summaryLoading,
    error: summaryError,
  } = useSummarizeReviews(productId);

  const handleSummarize = () => {
    if (summaryLoading) return <ReivewSkeleton number={1} />;
    if (summaryError)
      return (
        <div className="text-red-500 pl-5 mt-5">{summaryError.message}</div>
      );
    summarizeReviews();
  };

  if (reviews?.reviews?.length === 0)
    return <div className="text-red-500 pl-5 mt-5">No reviews found</div>;
  if (error)
    return (
      <div className="text-red-500 pl-5 mt-5">
        Something went wrong , Couldn't fetch reviews , try again later
      </div>
    );
  if (isLoading) {
    return <ReivewSkeleton number={3} />;
  }
  const currentSummary = summaryLoading ? (
    <ReivewSkeleton number={1} />
  ) : (
    summarizeResponse?.summary || reviews?.summary
  );

  return (
    <div>
      <div>
        {currentSummary ? (
          <h3 className=" border border-gray-200 rounded-lg p-5 m-5">
            <span className="font-semibold">Summary:</span> {currentSummary}
          </h3>
        ) : (
          <button
            disabled={summaryLoading}
            onClick={() => handleSummarize()}
            className="bg-black text-white px-4 py-2 m-5 justify-center items-center gap-2 rounded-md flex cursor-pointer"
          >
            {" "}
            <HiSparkles /> Summarize
          </button>
        )}
      </div>
      {reviews?.reviews?.map((review) => (
        <div className="pl-5 pb-4 mt-5" key={review.id}>
          <h3 className="font-semibold">{review.author}</h3>
          <div className="text-sm text-gray-600">
            Rating: <StarRating rating={review.rating} />
          </div>
          <p className="text-sm  pt-2 text-gray-600">{review.content}</p>
        </div>
      ))}
    </div>
  );
};

export default ReivewsList;
