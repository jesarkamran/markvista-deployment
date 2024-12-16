import useUser from "@src/stores/user-context/useUser";
import { useReactToQuery } from "./useCommunity";
import Button from "@components/Button";
import { Button as ButtonShad } from "@components/ui/button";
import { MessageCircle, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { FiArrowDown, FiArrowUp } from "react-icons/fi";

export default function InteractionIcons({
  interaction,
  id = "",
  type = "query",
}) {
  const { reactToQuery } = useReactToQuery(id);

  const { user } = useUser();

  const isLiked = interaction?.likes.includes(user?._id);
  const isDisliked = interaction?.dislikes.includes(user?._id);
  const handler = (type) => {
    reactToQuery({ type, id: interaction?.id });
  };

  if (type === "answer") {
    return (
      <div className="flex items-center gap-4">
        <ButtonShad
          variant="ghost"
          size="sm"
          className="gap-1 hover:opacity-25"
          onClick={() => handler("like")}
        >
          <ThumbsUpIcon
            fill={isLiked ? "#1877F2" : "none"}
            className="h-4 w-4"
          />
          <span>{interaction?.likes.length}</span>
        </ButtonShad>
        <ButtonShad
          variant="ghost"
          size="sm"
          className="gap-1 hover:opacity-25"
          onClick={() => handler("dislike")}
        >
          <ThumbsDownIcon
            fill={isDisliked ? "#c04a27" : "none"}
            className="h-4 w-4"
          />
          <span>{interaction?.dislikes.length}</span>
        </ButtonShad>
      </div>
    );
  }

  const isAnswered = interaction?.answers?.includes(user._id);

  return (
    <div className="flex items-center justify-between gap-4 pt-2 sm:justify-start sm:gap-8">
      <div className="flex items-center space-x-2">
        <Button type="round" onClick={() => handler("like")}>
          <FiArrowUp
            className={`h-5 w-5 sm:h-6 sm:w-6 ${isLiked ? "text-green-600" : ""}`}
          />
        </Button>
        <span className="text-sm">{interaction?.likes.length}</span>
      </div>

      <div className="flex items-center space-x-2">
        <Button type="round" onClick={() => handler("dislike")}>
          <FiArrowDown
            className={`h-5 w-5 sm:h-6 sm:w-6 ${isDisliked ? "text-red-600" : ""}`}
          />
        </Button>
        <span className="text-sm">{interaction?.dislikes.length}</span>
      </div>

      {/* Comment Action */}
      {!id && (
        <div className="flex items-center space-x-2">
          <Button type="round">
            <MessageCircle
              className={`h-4 w-4 sm:h-5 sm:w-5 ${isAnswered ? "text-blue-600" : ""}`}
            />
          </Button>
          <span className="text-sm">{interaction?.answers.length}</span>
        </div>
      )}
    </div>
  );
}
