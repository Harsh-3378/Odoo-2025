import BuyNowPopup from "@/components/BuyNowPopup"; // new import
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getProductById } from "@/services/Product/Products";
import { selectCurrentUser } from "@/state/authSlice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

// Dummy seller info for demo
const DUMMY_SELLER = {
  name: "alexandearth",
  avatar: "/default-avatar.png",
  rating: 4.8,
  location: "United States",
  lastSeen: "5 hours ago",
};

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mainImgIdx, setMainImgIdx] = useState(0);
  const currentUser = useSelector(selectCurrentUser);
  const [showBuyNow, setShowBuyNow] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    getProductById(id)
      .then((res) => setProduct(res.data.product || res.data))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (!product) return <div className="p-8 text-center text-red-500">Product not found.</div>;

  const images =
    product.images?.length > 0 ? product.images : [{ url: "/placeholder.png", alt: "No image" }];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Image Gallery */}
        <div className="flex flex-col items-center gap-4 min-w-[340px]">
          <div className="border rounded-lg bg-white flex items-center justify-center w-[340px] h-[340px]">
            <img
              src={images[mainImgIdx]?.url}
              alt={images[mainImgIdx]?.alt || product.title}
              className="object-contain max-h-[320px] max-w-[320px]"
            />
          </div>
          <div className="flex flex-col gap-2">
            {images.map((img, idx) => (
              <img
                key={idx}
                src={img.url}
                alt={img.alt || product.title}
                className={`w-16 h-16 object-cover rounded border cursor-pointer ${
                  mainImgIdx === idx ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => setMainImgIdx(idx)}
              />
            ))}
          </div>
        </div>
        {/* Product Info */}
        <div className="flex-1 flex flex-col gap-6">
          <Card className="shadow border">
            <CardHeader className="pb-2">
              <CardTitle className="text-xl">{product.title}</CardTitle>
              <CardDescription className="text-base">{product.description}</CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-col gap-2">
                <div className="text-2xl font-bold text-primary">${product.originalPrice}</div>
                <div className="text-sm text-gray-500">Shipping: $8.92</div>
                <div className="flex gap-2 mt-2">
                  <button
                    className="bg-primary text-white px-4 py-2 rounded font-semibold"
                    onClick={() => setShowBuyNow(true)}
                  >
                    Buy now
                  </button>
                  <button className="border px-4 py-2 rounded font-semibold">Make an offer</button>
                  <button className="border px-4 py-2 rounded font-semibold">Message seller</button>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
                  <div>
                    <span className="font-semibold">Category:</span> {product.category}
                  </div>
                  <div>
                    <span className="font-semibold">Type:</span> {product.type}
                  </div>
                  <div>
                    <span className="font-semibold">Brand:</span> {product.brand}
                  </div>
                  <div>
                    <span className="font-semibold">Size:</span> {product.size}
                  </div>
                  <div>
                    <span className="font-semibold">Color:</span> {product.color}
                  </div>
                  <div>
                    <span className="font-semibold">Condition:</span> {product.condition}
                  </div>
                  <div>
                    <span className="font-semibold">Points Value:</span> {product.pointsValue}
                  </div>
                  <div>
                    <span className="font-semibold">Status:</span>{" "}
                    <Badge variant={product.status === "approved" ? "default" : "secondary"}>
                      {product.status?.charAt(0).toUpperCase() + product.status?.slice(1) ||
                        "Pending"}
                    </Badge>
                  </div>
                  <div className="col-span-2">
                    <span className="font-semibold">Tags:</span>{" "}
                    {product.tags?.length > 0
                      ? product.tags.map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="mr-1">
                            {tag}
                          </Badge>
                        ))
                      : "None"}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Seller Info */}
          <Card>
            <CardContent className="flex items-center gap-4 py-4">
              <img
                src={DUMMY_SELLER.avatar}
                alt={DUMMY_SELLER.name}
                className="w-12 h-12 rounded-full border"
              />
              <div>
                <div className="font-semibold">{DUMMY_SELLER.name}</div>
                <div className="text-xs text-gray-500">
                  ⭐ {DUMMY_SELLER.rating} | {DUMMY_SELLER.location}
                </div>
                <div className="text-xs text-gray-400">Last seen {DUMMY_SELLER.lastSeen}</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Member's items (other products from seller) */}
      <div className="mt-10">
        <div className="font-semibold mb-2">Member's items</div>
        <div className="flex gap-4">
          {[1, 2, 3, 4].map((_, idx) => (
            <div
              key={idx}
              className="w-36 h-48 bg-gray-100 rounded-lg flex flex-col items-center justify-center text-gray-400"
            >
              <div className="w-24 h-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-20 bg-gray-200 rounded mb-1"></div>
              <div className="h-3 w-12 bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>
      </div>
      {showBuyNow && (
        <BuyNowPopup
          open={showBuyNow}
          onClose={() => setShowBuyNow(false)}
          product={product}
          userPoints={currentUser?.points || 0}
        />
      )}
    </div>
  );
}

export default ProductDetail;
