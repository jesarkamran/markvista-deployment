import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@components/ui/card";
import { Textarea } from "@components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { useAnswerQuery } from "./useCommunity";
import { Button } from "@components/ui/button";
import { Send } from "lucide-react";

const PostAnswer = ({ queryId }) => {
  const [newAnswer, setNewAnswer] = useState("");
  const { isLoading, answerToQuery } = useAnswerQuery(queryId);
  const handler = () => {
    if (!newAnswer) {
      toast.success("please write someting to answer");
      console.log("please write someting to answer");

      return;
    }
    console.log("answering...");
    answerToQuery({ answer: newAnswer });
    setNewAnswer("");
  };

  return (
    <Card className="border border-opacity-25 bg-white dark:border-[var(--color-section)] dark:bg-[var(--color-section)]">
      <CardHeader>
        <CardTitle>Your Answer</CardTitle>
      </CardHeader>
      <CardContent>
        <Textarea
          placeholder="Type your answer here..."
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="min-h-[100px] dark:bg-[var(--color-background)]"
          disabled={isLoading}
        />
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button
          onClick={handler}
          className="rounded-md bg-blue-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          <Send className="mr-2 h-4 w-4" />
          {isLoading ? "Posting... Answer" : "Post Answer"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostAnswer;
