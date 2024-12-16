import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import useUser from "@src/stores/user-context/useUser";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useDeleteInteraction, useUpdateAnswer } from "./useCommunity";
import { toast } from "sonner";
import ImagePreview from "@features/user/ImagePreview";
import { getTimeDifference } from "@src/utils/formatter";
import { Button } from "@components/ui/button";
import DeleteInteraction from "./DeleteInteraction";
import { Textarea } from "@components/ui/textarea";
import InteractionIcons from "./InteractionIcons";
import { Pencil } from "lucide-react";

const QueryAnswers = ({ answers }) => {
  return (
    <Card className="border border-opacity-25 bg-white dark:border-[var(--color-section)] dark:bg-[var(--color-section)]">
      <CardHeader>
        <CardTitle>{answers.length} Answers</CardTitle>
      </CardHeader>
      <CardContent>
        <div
          style={{ scrollbarWidth: "none" }}
          className="h-[400px] overflow-auto pr-4"
        >
          <div className="space-y-4">
            {answers.map((answer) => (
              <Answer key={answer.id} answer={answer} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default QueryAnswers;
function Answer({ answer }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(answer.content);
  const { queryId } = useParams();
  const { user } = useUser();
  const isUser = answer.author.id === user._id;
  const { deleteInteraction: deleteAnswer } = useDeleteInteraction(queryId);
  const { updateAnswer } = useUpdateAnswer(queryId);

  const handleSaveEdit = async () => {
    try {
      await updateAnswer(answer.id, { answer: editedContent });
      setIsEditing(false);
    } catch (error) {
      toast.error("Failed to update answer");
    }
  };

  return (
    <Card
      key={answer.id}
      className="border border-opacity-25 bg-white dark:border-gray-700 dark:bg-[var(--color-section)]"
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-4">
          {answer.author && (
            <ImagePreview
              photo={answer.author.phot}
              addStyles="h-16 w-16"
              alt={answer.author.name[0]}
            />
          )}
          <div className="flex-1 space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-x-2">
                <p className="text-sm font-medium">{answer.author.name}</p>
                {answer.edited && (
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    (Edited)
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-justify text-xs">
                  {getTimeDifference(answer.createdAt)}
                </span>
                {isUser && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditing(!isEditing)}
                      className="hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <DeleteInteraction
                      id={answer.id}
                      interaction="answer"
                      onDelete={() => deleteAnswer(answer.id)}
                    />
                  </>
                )}
              </div>
            </div>

            {isEditing ? (
              <div className="space-y-2">
                <Textarea
                  value={editedContent}
                  onChange={(e) => setEditedContent(e.target.value)}
                  className="w-full dark:bg-[var(--color-background)]"
                />
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="bg-gray-300 text-gray-800 hover:opacity-25 dark:bg-[var(--color-background)] dark:text-gray-200"
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="bg-blue-600 hover:opacity-25 dark:bg-blue-800"
                    onClick={handleSaveEdit}
                    disabled={editedContent.trim() === answer.content.trim()}
                  >
                    Save
                  </Button>
                </div>
              </div>
            ) : (
              <AnswerContent content={answer.content} />
            )}

            <InteractionIcons interaction={answer} id={queryId} type="answer" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
function AnswerContent({ content }) {
  const [show, setShow] = useState(false);
  const isLongContent = content.length > 150;

  const toggleContent = () => {
    setShow(!show);
  };

  return (
    <p className="text-muted-foreground relative text-sm">
      {show ? content : content.slice(0, 150) + (isLongContent ? "..." : "")}

      {isLongContent && (
        <span className="mt-1 block">
          {!show ? (
            <Button
              variant="link"
              size="sm"
              onClick={toggleContent}
              className="text-primary/70 hover:text-primary ml-1 p-0"
            >
              Show more
            </Button>
          ) : (
            <Button
              variant="link"
              size="sm"
              onClick={toggleContent}
              className="text-primary/70 hover:text-primary ml-1 p-0"
            >
              Show less
            </Button>
          )}
        </span>
      )}
    </p>
  );
}
