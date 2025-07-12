import NotFound from "@/pages/NotFound/NotFound.jsx";
import PublicHome from "@/pages/PublicHome/PublicHome";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home";
import Layout from "./Layout";
import LoginPage from "./pages/LoginPage/LoginPage";
import AddProduct from "./pages/Product/AddProduct";
import EditProduct from "./pages/Product/EditProduct";
import Product from "./pages/Product/Product";
import ProductDetail from "./pages/Product/ProductDetail";
import ProfileSetup from "./pages/Profile/ProfileSetup";
import SignupPage from "./pages/SigninPage/SignupPage";
import UserProfile from "./pages/Profile/UserProfile";
import ManageUsers from "./pages/Admin/ManageUsers";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* Profile setup route outside Layout */}
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="signup" element={<SignupPage />} />
          <Route path="dashboard" element={<Home />} />
          <Route path="profile" element={<UserProfile />} />
          <Route path="admin" element={<ManageUsers />} />
        </Route>
        <Route path="/product" element={<Layout />}>
          <Route index element={<Product />} />
          <Route path="add" element={<AddProduct />} />
          <Route path="edit/:id" element={<EditProduct />} />
          <Route path=":id" element={<ProductDetail />} /> {/* Product detail route */}
        </Route>
        <Route path="/home" element={<PublicHome />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
