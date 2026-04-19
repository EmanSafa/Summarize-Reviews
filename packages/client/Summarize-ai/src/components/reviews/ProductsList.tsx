import { useState } from "react";
import { useGetProducts } from "./api/api";
import ReivewSkeleton from "./ReivewSkeleton";

const ProductsList = ({
  onSelectProduct,
}: {
  onSelectProduct: (id: number) => void;
}) => {
  const { data: products, isLoading, error } = useGetProducts();
  const handleOnClick = (id: number) => {
    onSelectProduct(id);
  };
  if (isLoading) {
    return <ReivewSkeleton number={3} />;
  }
  if (error) {
    return <div className="text-red-500 pl-5 mt-5">{error.message}</div>;
  }
  return (
    <div className="flex gap-2 m-3">
      {products?.map((product) => (
        <div
          key={product.id}
          onClick={() => handleOnClick(product.id)}
          className="flex flex-col bg-yellow-100 border border-gray-200 p-3 gap-4 cursor-pointer hover:bg-yellow-200 hover:scale-105 transition-colors duration-200"
        >
          <h3 className="font-semibold text-xl">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.description}</p>
          <p className="text-sm text-red-800">${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default ProductsList;
