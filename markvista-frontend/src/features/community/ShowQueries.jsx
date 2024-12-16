import Spinner from "@components/Spinner";
import QueryCard from "./QueryCard";
import { useParams } from "react-router-dom";
import { useFetchQueries } from "./useCommunity";

function ShowQueries() {
  const { query } = useParams();

  const { isLoading, isError, error, data } = useFetchQueries(query);

  if (isLoading)
    return (
      <div className="mx-auto max-w-2xl">
        <Spinner />;
      </div>
    );
  if (isError) {
    console.log(error);

    return (
      <div className="text-muted-foreground py-10 text-center">
        No queries found
      </div>
    );
  }

  if (!data?.length) {
    return (
      <div className="text-muted-foreground py-10 text-center">
        {query ? `No queries found for "${query}"` : "No queries available"}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-4">
      {data.map((query) => (
        <QueryCard key={query.id} query={query} />
      ))}
    </div>
  );
}

export default ShowQueries;
