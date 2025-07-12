import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useCloudinaryUpload } from "@/utils/useCloudinary";
import { Loader2 } from "lucide-react";
import * as React from "react";

export function ImageUploadComponent({ onUploaded }) {
  const [imageFiles, setImageFiles] = React.useState([]);
  const { uploadFiles, uploading, error, uploadedUrls, resetUpload } = useCloudinaryUpload();

  const handleFileChange = (e) => {
    setImageFiles(Array.from(e.target.files));
  };

  const handleUpload = async () => {
    try {
      const urls = await uploadFiles(imageFiles);
      if (onUploaded) onUploaded(urls);
    } catch (err) {
      console.error("Image upload failed:", err);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold">Image Upload</h1>
        <p className="text-muted-foreground">Upload PNG, JPG, or WEBP images to Cloudinary</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Upload Images</CardTitle>
          <CardDescription>Select PNG, JPG, or WEBP files to upload</CardDescription>
        </CardHeader>
        <CardContent>
          <div>
            <label
              htmlFor="image-upload-input"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              Image Files
            </label>
            <input
              id="image-upload-input"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              multiple
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
            />
            <p className="text-xs text-muted-foreground mt-1">
              PNG, JPG, WEBP up to 5MB each (maximum 10 files)
            </p>
          </div>

          {imageFiles.length > 0 && (
            <div className="mt-4 space-y-2">
              <p className="text-sm text-muted-foreground">
                Selected {imageFiles.length} file(s): {imageFiles.map((f) => f.name).join(", ")}
              </p>
              <Button
                onClick={handleUpload}
                disabled={uploading || imageFiles.length === 0}
                className="w-full"
              >
                {uploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  `Upload ${imageFiles.length} Image${imageFiles.length > 1 ? "s" : ""}`
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
