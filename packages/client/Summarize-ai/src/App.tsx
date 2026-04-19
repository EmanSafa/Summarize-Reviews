import "./App.css";
import ReivewsList from "./components/reviews/ReivewsList";
import ProductsList from "./components/reviews/ProductsList";
import { useState } from "react";

function App() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null);
  return (
    <>
      <ProductsList onSelectProduct={setSelectedProduct} />
      <ReivewsList productId={selectedProduct} />
    </>
  );
}

export default App;
