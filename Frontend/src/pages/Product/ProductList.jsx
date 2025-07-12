import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/services/Product/Products";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function ProductList() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const pageSize = 4; // 4 per row as in screenshot
  const navigate = useNavigate();

  useEffect(() => {
    getAllProducts().then((products) => {
      setProducts(products);
    });
  }, []);

  const paginated = products.slice((page - 1) * pageSize, page * pageSize);

  // Helper for rendering stars
  const renderStars = (rating = 0, reviews = 0) => (
    <div className="flex items-center gap-1 text-yellow-500 text-sm">
      {[...Array(5)].map((_, i) =>
        i < rating ? (
          <span key={i}>★</span>
        ) : (
          <span key={i} className="text-gray-300">
            ★
          </span>
        ),
      )}
      <span className="text-xs text-gray-500 ml-1">
        {reviews > 0 ? `(${reviews})` : "No reviews"}
      </span>
    </div>
  );

  return (
    <div className="p-0">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Best Sellers</h2>
        <Button onClick={() => navigate("/product/add")}>+ Add Product</Button>
      </div>
      <div className="flex justify-end mb-4">
        <Link to="/products" className="underline text-gray-700 text-sm">
          View all products
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {paginated.map((product) => (
          <div
            key={product._id}
            className="bg-white rounded-xl border shadow-sm flex flex-col items-stretch p-4 relative cursor-pointer hover:shadow-md transition"
            onClick={() => navigate(`/product/${product.product_id}`)}
          >
            {/* Example badges */}
            {product.isNew && (
              <Badge className="absolute top-3 right-3 bg-green-500 text-white">NEW</Badge>
            )}
            {product.discount && (
              <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                -{product.discount}%
              </Badge>
            )}
            <img
              src={product.images?.[0]?.url || "/placeholder.png"}
              alt={product.images?.[0]?.alt || ""}
              className="w-full h-40 object-contain mb-4"
            />
            <div className="mb-1 text-lg font-semibold">{product.title}</div>
            <div className="mb-1 text-gray-700 font-medium">
              {product.discountPrice ? (
                <>
                  <span>${product.discountPrice}</span>
                  <span className="line-through text-gray-400 ml-2">${product.originalPrice}</span>
                </>
              ) : (
                <>${product.originalPrice}</>
              )}
            </div>
            {renderStars(product.rating, product.reviews)}
            <div className="text-xs text-gray-500 mb-2">{product.description}</div>
            <Button className="w-full mb-2">Buy now</Button>
            <div className="text-xs text-gray-400 mb-2">
              Choose a store to see local availability
            </div>
            {/* Example icons for dietary info */}
            <div className="flex gap-2 mt-auto">
              {/* Replace with actual icons if available */}
              {product.isVegan && <span title="Vegan">🌱</span>}
              {product.isGlutenFree && <span title="Gluten Free">🌾</span>}
              {product.isNutFree && <span title="Nut Free">🥜</span>}
            </div>
          </div>
        ))}
        {paginated.length === 0 && (
          <div className="col-span-full text-center py-6 text-gray-400">No products found.</div>
        )}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-end gap-2 p-2 mt-4">
        <Button size="sm" variant="outline" disabled={page === 1} onClick={() => setPage(page - 1)}>
          Prev
        </Button>
        <span className="px-2 py-1">{page}</span>
        <Button
          size="sm"
          variant="outline"
          disabled={page * pageSize >= products.length}
          onClick={() => setPage(page + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default ProductList;
