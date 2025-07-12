import UserProfile from "@/pages/Profile/UserProfile";
import { Route, Routes } from "react-router-dom";
import ProductByCategory from "./Product/ProductByCategory";
import ProductList from "@/pages/Product/ProductList";

function Home() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <div>
            {/* add here some best banner */}
            {/* and add category like that tah automattically sawed ht eproduct  */}
            <img src="/banner.webp" alt="Best Products" className="w-full h-auto" />
            <ProductByCategory category={"Clothing"} />
            <ProductList />
          </div>
        }
      />
      <Route path="/profile" element={<UserProfile />} />
      {/* ...other routes if any... */}
    </Routes>
  );
}

export default Home;
