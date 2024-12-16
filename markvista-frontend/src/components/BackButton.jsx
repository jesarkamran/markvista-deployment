import Button from "@components/Button";
import { ArrowLeft } from "lucide-react";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
function BackButton({ type = "" }) {
  const navigate = useNavigate();
  const handler = () => navigate(-1);

  return (
    <Button onClick={handler}>
      {type === "no-tail" ? (
        <MdKeyboardArrowLeft className="text-4xl dark:text-gray-200" />
      ) : (
        <ArrowLeft />
      )}
    </Button>
  );
}

export default BackButton;
