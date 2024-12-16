import { useState } from "react";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ImageUpload } from "@components/ui/image-upload";
import { useCreateQuery } from "./useCommunity";
import Input from "@components/ui/input";
import BackButton from "@components/BackButton";

function AddQuery() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [coverImage, setCoverImage] = useState(null);
  const createQueryMutation = useCreateQuery();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!title.trim() || !description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (coverImage) {
      formData.append("photo", coverImage);
    }

    createQueryMutation.mutate(formData);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="mx-auto max-w-2xl bg-white shadow-lg dark:bg-[var(--color-section)]">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            <div className="flex gap-x-1">
              <BackButton type="no-tail" />
              Create a New Query
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label
                htmlFor="title"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Query Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a clear and concise query title"
                className="w-full"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Detailed Description
              </label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Provide more context about your query"
                rows={6}
                className="w-full dark:bg-[var(--color-background)]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Cover Image (Optional)
              </label>
              <ImageUpload
                onFileSelect={(file) => setCoverImage(file)}
                existingImage={null}
              />
            </div>

            <div className="flex justify-end space-x-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  setTitle("");
                  setDescription("");
                  setCoverImage(null);
                }}
                className="bg-gray-500 text-gray-100 hover:opacity-45 dark:bg-gray-300 dark:text-gray-700"
              >
                Clear
              </Button>
              <Button
                type="submit"
                disabled={createQueryMutation.isLoading}
                className="bg-blue-600 text-white hover:opacity-25"
              >
                {createQueryMutation.isLoading ? "Posting..." : "Post Query"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default AddQuery;
