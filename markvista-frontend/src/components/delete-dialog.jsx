import { useState } from "react";
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
} from "@/components/ui/alert-dialog";
import { Trash2 } from "lucide-react";

function DeleteButton({ onDelete, itemName = "this item" }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirmDelete = () => {
    onDelete();
    setIsOpen(false);
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <button
          onClick={() => setIsOpen(true)}
          className="rounded-full p-2 transition-colors hover:bg-red-100 dark:hover:bg-red-700"
          aria-label="Delete"
        >
          <Trash2
            size={24}
            className="text-gray-600 hover:text-red-500 dark:text-gray-50 dark:hover:text-red-500"
          />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white dark:bg-stone-800">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-gray-800 dark:text-gray-50">
            Are you absolutely sure?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-gray-600 dark:text-gray-300">
            This action cannot be undone. This will permanently delete{" "}
            {itemName}
            from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-gray-600 hover:text-gray-800 dark:text-gray-300 dark:hover:text-gray-50">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleConfirmDelete}
            className="bg-red-600 text-white hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700"
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteButton;
