import ProductByCategory from "@/components/Product/ProductByCategory";
import { Route, Routes, useParams } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductList from "./ProductList";

function Product() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path="category/:category" element={<ProductByCategoryWrapper />} />
      <Route path=":id" element={<ProductDetail />} />
    </Routes>
  );
}

// Wrapper to extract category param and pass as prop
function ProductByCategoryWrapper() {
  const { category } = useParams();
  return <ProductByCategory category={category} />;
}

export default Product;
