import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@components/ui/alert-dialog";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";

function DeleteInteraction({ id, onDelete, interaction }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await onDelete(id);
      toast.success("Answer deleted successfully");
      setIsOpen(false);
    } catch (error) {
      toast.error("Failed to delete answer");
      console.error(error);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="gap-1 text-red-500 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-900/20"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="rounded-lg border border-gray-200 bg-white shadow-xl dark:border-gray-700 dark:bg-[var(--color-background)]">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-400">
            This action cannot be undone. This will permanently delete your
            {interaction}.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex gap-2">
          <AlertDialogCancel className="text-gray-800 hover:bg-gray-100 dark:bg-slate-300 dark:hover:opacity-25">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            className="bg-red-500 text-white hover:bg-red-600 focus:ring-2 focus:ring-red-300"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteInteraction;
