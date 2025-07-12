import { useState } from "react";

export function useCloudinaryUpload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);
  const [uploadedUrls, setUploadedUrls] = useState([]);

  const uploadFiles = async (files, subfolder) => {
    setUploading(true);
    setError(null);

    try {
      const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
      const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;
      const folderName = import.meta.env.VITE_CLOUDINARY_FOLDER_NAME;

      if (!cloudName || !uploadPreset) {
        throw new Error(
          "Cloudinary configuration missing. Please check your environment variables (VITE_CLOUDINARY_CLOUD_NAME and VITE_CLOUDINARY_UPLOAD_PRESET).",
        );
      }

      const uploadPromises = files.map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);

        // Construct the folder path with subfolder
        let finalFolderPath = folderName;
        if (subfolder) {
          finalFolderPath = folderName ? `${folderName}/${subfolder}` : subfolder;
        }

        if (finalFolderPath) {
          formData.append("folder", finalFolderPath);
        }

        const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
          method: "POST",
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(
            `Upload failed for ${file.name}: ${
              (errorData.error && errorData.error.message) || response.statusText
            }`,
          );
        }

        const result = await response.json();
        return result.secure_url;
      });

      const urls = await Promise.all(uploadPromises);
      setUploadedUrls((prev) => [...prev, ...urls]);
      return urls;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Upload failed";
      setError(errorMessage);
      throw err;
    } finally {
      setUploading(false);
    }
  };

  const resetUpload = () => {
    setUploadedUrls([]);
    setError(null);
  };

  return {
    uploadFiles,
    uploading,
    error,
    uploadedUrls,
    resetUpload,
  };
}
