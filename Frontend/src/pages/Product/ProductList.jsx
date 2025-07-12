import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAllProducts } from "@/services/Product/Products";
import { useEffect, useState } from "react";

// Replace with your shadcn table import
// import { Table, TableHead, TableRow, TableCell, TableBody } from "@/components/ui/table";

function ProductList() {
  const [products, setProducts] = useState([]);
  // Pagination state (optional)
  const [page, setPage] = useState(1);
  const pageSize = 5;

  useEffect(() => {
    getAllProducts().then((res) => {
      setProducts(res.data?.data || []);
    });
  }, []);

  // Pagination logic
  const paginated = products.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products list</h2>
        <Button>+ Add Product</Button>
      </div>
      <div className="rounded-lg border bg-white shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">#</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">
                PRODUCT DETAIL
              </th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">CATEGORIES</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">PRICE</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">QTY</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">BRAND</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500">STATUS</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((product, idx) => (
              <tr key={product._id} className="border-b">
                <td className="px-4 py-2">{(page - 1) * pageSize + idx + 1}</td>
                <td className="px-4 py-2 flex items-center gap-2">
                  <img
                    src={product.image || "/placeholder.png"}
                    alt=""
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div>
                    <div className="font-semibold">{product.name}</div>
                    <div className="text-xs text-gray-500">{product.description}</div>
                  </div>
                </td>
                <td className="px-4 py-2">{product.categories?.join(", ")}</td>
                <td className="px-4 py-2">${product.price}</td>
                <td className="px-4 py-2">{product.qty}</td>
                <td className="px-4 py-2">{product.brand}</td>
                <td className="px-4 py-2">
                  {product.status === "active" ? (
                    <Badge variant="default">Active</Badge>
                  ) : (
                    <Badge variant="secondary">Inactive</Badge>
                  )}
                </td>
              </tr>
            ))}
            {paginated.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-6 text-gray-400">
                  No products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        {/* Pagination controls */}
        <div className="flex justify-end gap-2 p-2">
          <Button
            size="sm"
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
          >
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
    </div>
  );
}

export default ProductList;
