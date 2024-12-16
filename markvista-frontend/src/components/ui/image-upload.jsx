import { useState, useRef } from "react";
import { Image, X, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ImageUpload({
  onFileSelect,
  existingImage = null,
  maxSize = 5 * 1024 * 1024, // 5MB default
}) {
  const [preview, setPreview] = useState(existingImage);
  const fileInputRef = useRef(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) return;

    // Validate file size
    if (file.size > maxSize) {
      toast.error(`File size should be less than ${maxSize / 1024 / 1024}MB`);
      return;
    }

    // Validate file type
    const validTypes = ["image/jpeg", "image/png", "image/gif"];
    if (!validTypes.includes(file.type)) {
      toast.error("Only JPEG, PNG, and GIF images are allowed");
      return;
    }

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onFileSelect(file);
    };
    reader.readAsDataURL(file);
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    onFileSelect(null);
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept="image/jpeg,image/png,image/gif"
        className="hidden"
      />

      {preview ? (
        <div className="relative">
          <img
            src={preview}
            alt="Preview"
            className="h-48 max-w-full rounded-lg object-cover"
          />
          <Button
            type="button"
            variant="destructive"
            size="icon"
            className="absolute right-2 top-2 rounded-full"
            onClick={clearImage}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      ) : (
        <div className="w-full rounded-lg border-2 border-dashed border-gray-300 p-6 text-center dark:border-gray-600">
          <div className="flex flex-col items-center space-y-2">
            <Image className="h-12 w-12 text-gray-400" />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              No image selected
            </p>
          </div>
        </div>
      )}

      <Button
        type="button"
        variant="outline"
        onClick={() => fileInputRef.current.click()}
        className="flex items-center gap-2"
      >
        <Upload className="h-4 w-4" />
        {preview ? "Change Image" : "Upload Image"}
      </Button>
    </div>
  );
}
