import { Route, Routes } from "react-router-dom";
import ProductDetail from "./ProductDetail";
import ProductList from "./ProductList";

function Product() {
  return (
    <Routes>
      <Route path="/" element={<ProductList />} />
      <Route path=":id" element={<ProductDetail />} />
    </Routes>
  );
}

export default Product;
