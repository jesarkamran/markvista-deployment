import "./RiskprofileTemplate.css";
import { useNavigate } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Loader2, Pencil, Info, Eye, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

const RiskprofileTemplate = ({
  id,
  title,
  onDelete,
  isChecked,
  onToggle,
  defaultProfile,
  value,
}) => {
  const navigate = useNavigate();
  const loading = false;
  const navigateToDescription = () => {
    navigate(`/app/description/${id}`);
  };

  const handleDelete = async () => {
    try {
      const response = await fetch(
        `http://localhost:4000/api/riskprofiles/${id}`,
        {
          method: "DELETE",
        },
      );

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      onDelete(id);
    } catch (error) {
      console.error("Error deleting risk profile:", error);
    }
  };

  const handleEdit = () => {
    if (isChecked) {
      toast.warning("Active risk profiles cannot be edited.");
      return;
    }
    navigate(`/app/edit1/${id}`);
  };

  const navigateToMain = () => {
    navigate(`/app/main/${id}`);
  };

  return (
    <Card className="m-2 w-full overflow-hidden bg-gray-100 transition-all hover:shadow-md dark:bg-[var(--color-section)]">
      <CardContent className="p-2">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between sm:space-y-0">
          <div className="name text-sm font-semibold text-black dark:text-white">
            <h2 className="text-xl">{title}</h2>

            {defaultProfile && " (Default)"}
          </div>

          <div className="button1">
            <label className="switch">
              <input
                id="toggleButton"
                type="checkbox"
                checked={isChecked}
                value={value}
                onChange={onToggle}
              />
              <div className="slider">
                <div className="circle">
                  {isChecked ? (
                    <svg
                      className="checkmark"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 24 24"
                      xmlSpace="preserve"
                      height="10"
                      width="10"
                      style={{ enableBackground: "new 0 0 512 512" }}
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M9.707 19.121a.997.997 0 0 1-1.414 0l-5.646-5.647a1.5 1.5 0 0 1 0-2.121l.707-.707a1.5 1.5 0 0 1 2.121 0L9 14.171l9.525-9.525a1.5 1.5 0 0 1 2.121 0l.707.707a1.5 1.5 0 0 1 0 2.121z"
                        ></path>
                      </g>
                    </svg>
                  ) : (
                    <svg
                      className="cross"
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="0 0 365.696 365.696"
                      xmlSpace="preserve"
                      height="6"
                      width="6"
                      style={{ enableBackground: "new 0 0 512 512" }}
                    >
                      <g>
                        <path
                          fill="currentColor"
                          d="M243.188 182.86 356.32 69.726c12.5-12.5 12.5-32.766 0-45.247L341.238 9.398c-12.504-12.503-32.77-12.503-45.25 0L182.86 122.528 69.727 9.374c-12.5-12.5-32.766-12.5-45.247 0L9.375 24.457c-12.5 12.504-12.5 32.77 0 45.25l113.152 113.152L9.398 295.99c-12.503 12.503-12.503 32.769 0 45.25L24.48 356.32c12.5 12.5 32.766 12.5 45.247 0l113.132-113.132L295.99 356.32c12.503 12.5 32.769 12.5 45.25 0l15.081-15.082c12.5-12.504 12.5-32.77 0-45.25zm0 0"
                        ></path>
                      </g>
                    </svg>
                  )}
                </div>
              </div>
            </label>
          </div>

          {loading ? (
            <div className="flex items-center space-x-2">
              <Loader2 className="text-primary h-5 w-5 animate-spin" />
              <span className="text-muted-foreground text-sm">Loading...</span>
            </div>
          ) : (
            <div className="flex space-x-2">
              <Button variant="outline" size="icon" onClick={handleEdit}>
                <Pencil className="h-4 w-4" />
                <span className="sr-only">Edit</span>
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={navigateToDescription}
              >
                <Info className="h-4 w-4" />
                <span className="sr-only">Description</span>
              </Button>
              <Button variant="outline" size="icon" onClick={navigateToMain}>
                <Eye className="h-4 w-4" />
                <span className="sr-only">View</span>
              </Button>
              <Button variant="outline" size="icon" onClick={handleDelete}>
                <Trash2 className="h-4 w-4" />
                <span className="sr-only">Delete</span>
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
export default RiskprofileTemplate;
