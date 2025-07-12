import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { requestPurchase } from "@/services/Product/Products";
import { useState } from "react";

export default function BuyNowPopup({ open, onClose, product, userPoints }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const canPurchase = userPoints >= (product.pointsValue || 0);

  const handlePurchase = async () => {
    setLoading(true);
    setError("");
    try {
      await requestPurchase({
        product_id: product.product_id, // changed from id to product_id
        points: product.pointsValue,
      });
      setSuccess(true);
    } catch (err) {
      setError(err?.response?.data?.message || "Purchase failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onClose}>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Buy Now</SheetTitle>
        </SheetHeader>
        <div className="p-4 flex flex-col gap-4">
          <div>
            <strong>Product:</strong> {product.title}
          </div>
          <div>
            <strong>Points Required:</strong> {product.pointsValue}
          </div>
          <div>
            <strong>Your Points:</strong> {userPoints}
          </div>
          {!canPurchase && (
            <div className="text-red-500">You do not have enough points to purchase this item.</div>
          )}
          {error && <div className="text-red-500">{error}</div>}
          {success && <div className="text-green-600">Purchase successful!</div>}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <button className="border px-4 py-2 rounded" disabled={loading}>
              Cancel
            </button>
          </SheetClose>
          <button
            className="bg-primary text-white px-4 py-2 rounded"
            disabled={!canPurchase || loading || success}
            onClick={handlePurchase}
          >
            {loading ? "Processing..." : "Confirm Purchase"}
          </button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
