import { ImageUploadComponent } from "@/components/ImageUploader/ImageUploader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { createProduct } from "@/services/Product/Products";
import { useState } from "react";

const CATEGORY_OPTIONS = ["Sneakers", "Clothing", "Accessories", "Other"];
const BRAND_OPTIONS = ["Nike", "Adidas", "Puma", "Reebok", "Other"];
const SIZE_OPTIONS = ["34", "36", "38", "40", "42"];
const STATUS_OPTIONS = [
  { label: "Active", value: "active", color: "bg-green-100 text-green-800" },
  {
    label: "Processing",
    value: "processing",
    color: "bg-blue-100 text-blue-800",
  },
  { label: "Close", value: "close", color: "bg-red-100 text-red-800" },
  { label: "Pending", value: "pending", color: "bg-yellow-100 text-yellow-800" },
];

function AddProduct() {
  const [form, setForm] = useState({
    productName: "",
    category: "",
    brand: "",
    productDescription: "",
    price: "",
    compareAtPrice: "",
    costPerItem: "",
    quantity: "",
    sku: "",
    sellingType: "in-store",
    variant: [],
    size: "",
    images: [],
    itemWeight: "",
    status: "active",
  });

  // Handler for image upload
  const handleImagesUploaded = (urls) => {
    setForm((prev) => ({
      ...prev,
      images: urls.map((url) => ({ url, alt: "" })),
    }));
  };

  // Handler for form field changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handler for select changes
  const handleSelectChange = (name, value) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for status button
  const handleStatusChange = (value) => {
    setForm((prev) => ({
      ...prev,
      status: value,
    }));
  };

  // Handler for variant tags
  const handleVariantChange = (variant) => {
    setForm((prev) => ({
      ...prev,
      variant: prev.variant.includes(variant)
        ? prev.variant.filter((v) => v !== variant)
        : [...prev.variant, variant],
    }));
  };

  // Handler for size select
  const handleSizeChange = (size) => {
    setForm((prev) => ({
      ...prev,
      size,
    }));
  };

  // Handler for form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    // Build payload as per requirements
    const payload = {
      title: form.productName,
      description: form.productDescription,
      category: form.category,
      type: form.sellingType,
      size: form.size,
      brand: form.brand,
      color: "", // Add color field if you have it in your form
      condition: "", // Add condition field if you have it in your form
      originalPrice: Number(form.price) || 0,
      pointsValue: 0, // Add logic if you have points value
      images: form.images.slice(0, 3), // Only up to 3 images
      tags: form.variant, // Assuming variants are tags
      owner: "", // Set owner if available (e.g., from user context)
      status: form.status,
      availability: "", // Add availability if you have it in your form
      views: 0,
      likes: [],
      reports: [],
      moderationNotes: "",
      rejectionReason: "",
      featuredUntil: null,
      isPromoted: false,
    };

    try {
      await createProduct(payload);
      // Optionally reset form or show success message
      handleReset();
      // Optionally redirect or notify user
    } catch (err) {
      // Handle error (show notification, etc.)
      console.error("Product creation failed:", err);
    }
  };

  // Handler for reset
  const handleReset = () => {
    setForm({
      productName: "",
      category: "",
      brand: "",
      productDescription: "",
      price: "",
      compareAtPrice: "",
      costPerItem: "",
      quantity: "",
      sku: "",
      sellingType: "in-store",
      variant: [],
      size: "",
      images: [],
      itemWeight: "",
      status: "active",
    });
  };

  return (
    <form className="w-full min-h-screen bg-background p-4" onSubmit={handleSubmit}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Column */}
        <div className="space-y-6">
          {/* Product Description */}
          <Card>
            <CardHeader>
              <CardTitle>Product description</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input
                  name="productName"
                  placeholder="Enter Product Name"
                  value={form.productName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) => handleSelectChange("category", v)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {CATEGORY_OPTIONS.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Brand</Label>
                  <Select value={form.brand} onValueChange={(v) => handleSelectChange("brand", v)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select brand" />
                    </SelectTrigger>
                    <SelectContent>
                      {BRAND_OPTIONS.map((brand) => (
                        <SelectItem key={brand} value={brand}>
                          {brand}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label>Product Description</Label>
                <Textarea
                  name="productDescription"
                  placeholder="Enter Product Description"
                  value={form.productDescription}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Price</Label>
                  <Input
                    name="price"
                    type="number"
                    placeholder="Price"
                    value={form.price}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>Compare at price</Label>
                  <Input
                    name="compareAtPrice"
                    type="number"
                    placeholder="Compare at price"
                    value={form.compareAtPrice}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="includingTax" className="size-4" />
                <Label htmlFor="includingTax">Including all, tax</Label>
              </div>
              <div>
                <Label>Cost per item</Label>
                <Input
                  name="costPerItem"
                  placeholder="Cost per item"
                  value={form.costPerItem}
                  onChange={handleChange}
                />
              </div>
            </CardContent>
          </Card>
          {/* Inventory */}
          <Card>
            <CardHeader>
              <CardTitle>Inventory</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Quantity</Label>
                  <Input
                    name="quantity"
                    type="number"
                    placeholder="Enter Quantity"
                    value={form.quantity}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label>SKU (optional)</Label>
                  <Input
                    name="sku"
                    placeholder="Enter SKU"
                    value={form.sku}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Right Column */}
        <div className="space-y-6">
          {/* Selling Type */}
          <Card>
            <CardHeader>
              <CardTitle>Selling type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sellingType"
                      value="in-store"
                      checked={form.sellingType === "in-store"}
                      onChange={handleChange}
                      className="size-4"
                    />
                    In-store selling only
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sellingType"
                      value="online"
                      checked={form.sellingType === "online"}
                      onChange={handleChange}
                      className="size-4"
                    />
                    Online selling only
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="sellingType"
                      value="both"
                      checked={form.sellingType === "both"}
                      onChange={handleChange}
                      className="size-4"
                    />
                    Available both in-store and online
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Variant */}
          <Card>
            <CardHeader>
              <CardTitle>Variant</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {["variant one", "variant two"].map((variant) => (
                  <Button
                    key={variant}
                    type="button"
                    variant={form.variant.includes(variant) ? "default" : "outline"}
                    className="rounded-full px-3 py-1 text-xs"
                    onClick={() => handleVariantChange(variant)}
                  >
                    {variant}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Select Size */}
          <Card>
            <CardHeader>
              <CardTitle>Select size</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {SIZE_OPTIONS.map((size) => (
                  <Button
                    key={size}
                    type="button"
                    variant={form.size === size ? "default" : "outline"}
                    className="rounded-full px-3 py-1 text-xs"
                    onClick={() => handleSizeChange(size)}
                  >
                    {size}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Product Image */}
          <Card>
            <CardHeader>
              <CardTitle>Product image</CardTitle>
              <CardDescription>Recommended resolution is 540*940 with file size</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploadComponent onUploaded={handleImagesUploaded} />
              <div className="flex flex-wrap gap-2 mt-2">
                {form.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={img.url}
                    alt={img.alt || "Product"}
                    className="w-20 h-20 object-cover rounded"
                  />
                ))}
              </div>
            </CardContent>
          </Card>
          {/* Shipping and Delivery */}
          <Card>
            <CardHeader>
              <CardTitle>Shipping and Delivery</CardTitle>
            </CardHeader>
            <CardContent>
              <Label>Item Weight</Label>
              <Input
                name="itemWeight"
                placeholder="12.00"
                value={form.itemWeight}
                onChange={handleChange}
              />
            </CardContent>
          </Card>
          {/* Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-2 flex-wrap">
                {STATUS_OPTIONS.map((status) => (
                  <Button
                    key={status.value}
                    type="button"
                    variant={form.status === status.value ? "default" : "outline"}
                    className={`rounded px-4 py-1 text-xs ${status.color}`}
                    onClick={() => handleStatusChange(status.value)}
                  >
                    {status.label}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      {/* Save/Reset Buttons */}
      <div className="max-w-7xl mx-auto flex justify-end gap-2 mt-8">
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
        <Button type="submit">Save product</Button>
      </div>
    </form>
  );
}

export default AddProduct;
