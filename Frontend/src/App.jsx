import NotFound from "@/pages/NotFound/NotFound.jsx";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";
import SignupPage from "./pages/SigninPage/SignupPage";
import ProductList from "./pages/Product/ProductList";
import Product from "./pages/Product/Product";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="dashboard" element={<Home />} />
        </Route>
        <Route path="/product" element={<Layout />}>
          <Route index element={<Product />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
