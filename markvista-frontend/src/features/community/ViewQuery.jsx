import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Spinner from "@components/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getTimeDifference } from "@src/utils/formatter";
import ImagePreview from "@features/user/ImagePreview";
import InteractionIcons from "./InteractionIcons";
import QueryAnswers from "./Answers";
import PostAnswer from "./PostAnswer";
import { getQuery } from "./asynchronous-code/async-function";

export default function ViewQuery() {
  const { queryId } = useParams();

  const {
    isLoading,
    isError,
    error,
    data: query,
  } = useQuery({
    queryKey: ["query", queryId],
    queryFn: async () => getQuery(queryId),
    enabled: !!queryId,
  });

  if (isLoading)
    return (
      <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-6">
        <Spinner />
      </div>
    );

  if (isError) {
    return <div className="error-container">Error: {error.message}</div>;
  }

  if (!query) {
    return <div>No query found</div>;
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 p-4 md:p-6">
      <QueryDetails query={query} />
      <PostAnswer queryId={query.id} />
      <QueryAnswers answers={query.answers} />
    </div>
  );
}

const QueryDetails = ({ query }) => {
  return (
    <Card className="border border-opacity-25 bg-white dark:border-[var(--color-section)] dark:bg-[var(--color-section)]">
      <CardHeader>
        <div className="flex items-start gap-4">
          <ImagePreview
            photo={query.author.photo}
            alt={query.author.name[0]}
            addStyles="h-16 w-16"
          />
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">{query.author.name}</p>
              <span className="text-muted-foreground text-xs">
                {getTimeDifference(query.createdAt)}
              </span>
            </div>
            <CardTitle className="mt-2 text-xl">{query.title}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">{query.description}</p>
        {query.coverImage && (
          <div className="mt-4">
            <img
              src={`http://localhost:4000${query.coverImage}`}
              alt={query.title}
              className="w-full rounded-md border border-opacity-25 dark:border-[var(--color-section)]"
            />
          </div>
        )}
      </CardContent>
      <CardFooter className="flex items-center gap-4">
        <InteractionIcons interaction={query} id={query.id} />
      </CardFooter>
    </Card>
  );
};
