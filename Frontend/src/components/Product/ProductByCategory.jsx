import { Badge } from "@/components/ui/badge";
import { getProductsByCategory } from "@/services/Product/Products";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProductByCategory({ category }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;
    setLoading(true);
    getProductsByCategory(category)
      .then((products) => setProducts(products))
      .finally(() => setLoading(false));
  }, [category]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">
        Products in <span className="capitalize">{category}</span>
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length === 0 && (
          <div className="col-span-full text-center py-6 text-gray-400">
            No products found.
          </div>
        )}
        {products.map((product) => (
          <Link
            key={product._id}
            to={`/product/${product.product_id}`}
            className="block bg-white rounded-lg shadow hover:shadow-lg transition border overflow-hidden"
          >
            <img
              src={product.images?.[0]?.url || "/placeholder.png"}
              alt={product.images?.[0]?.alt || product.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex flex-col gap-2">
              <div className="font-semibold text-lg truncate">{product.title}</div>
              <div className="text-sm text-gray-500 truncate">{product.brand}</div>
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="capitalize">
                  {product.category}
                </Badge>
                <span className="text-primary font-bold">${product.originalPrice}</span>
              </div>
              <div className="flex gap-2 flex-wrap">
                <Badge variant={product.status === "approved" ? "default" : "secondary"}>
                  {product.status?.charAt(0).toUpperCase() + product.status?.slice(1) || "Pending"}
                </Badge>
                <span className="text-xs text-gray-400">{product.size}</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default ProductByCategory;
