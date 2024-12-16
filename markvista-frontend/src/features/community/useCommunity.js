import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useCommunity from "@src/stores/community-context/useCommunity";
import { axiosCommunity } from "@src/utils/api";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import {
  answerQuery,
  deleteInteraction,
  getAllQueries,
  searchQuery,
} from "./asynchronous-code/async-function";
import communityActivityService from "./asynchronous-code/activityTrack";

// react query hook to answer a query
export function useAnswerQuery(queryId) {
  const queryClient = useQueryClient();
  const { isLoading, mutate: answerToQuery } = useMutation({
    mutationFn: async (answer) => {
      // Track activity After answering
      await communityActivityService.updateActivity(
        "query_answered",
        "You answered a query",
      );
      return await answerQuery(answer, queryId);
    },
    onSuccess: () => {
      // Invalidate the "queries" query
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });
      queryClient.invalidateQueries({
        queryKey: ["query", queryId],
      });

      // console.log(data);
      toast.success("Answere added to the query");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isLoading, answerToQuery };
}

async function reactingToQuery(action, queryId) {
  const { data: responseData } = await axiosCommunity.put(
    `/like-dislike/${queryId}?action=${action}`,
  );
  return responseData;
}

// react query hook for reacting to a query or an answer
export function useReactToQuery(queryId, interaction = "query") {
  const queryClient = useQueryClient();
  const { isLoading, mutate: reactToQuery } = useMutation({
    mutationFn: async ({ type, id }) => {
      // Track activity before reacting
      await communityActivityService.updateActivity(
        `react_${type}`,
        `You ${type}d ${interaction === "query" ? "a query" : "an answer"}`,
      );

      return await reactingToQuery(type, id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["queries"],
      });

      if (queryId)
        queryClient.invalidateQueries({
          queryKey: ["query", queryId],
        });
      console.log("Interaction Successfull");
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isLoading, reactToQuery };
}

export function useFetchQueries(query = "") {
  const { setQueries } = useCommunity(); // Use your context to set queries

  // Use the search query to fetch filtered data, or fetch all queries if searchQuery is empty
  const { isLoading, isError, error, data } = useQuery({
    queryKey: ["queries", query], // Dynamic query key based on searchQuery
    queryFn: query ? () => searchQuery(query) : getAllQueries, // Conditionally fetch based on whether there's a search query
    onSuccess: (data) => {
      setQueries(data); // Set the queries when the data is successfully fetched
    },
  });

  return { isLoading, isError, error, data };
}

// react query hook for searching a query
export function useSearchQuery() {
  const queryClient = useQueryClient();
  const { setQueries } = useCommunity();
  const { isPending: isLoading, mutate: getSearchedQueries } = useMutation({
    mutationFn: searchQuery,
    onSuccess: (data) => {
      queryClient.invalidateQueries(["queries"]);
      console.log(data);

      setQueries(data);
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isLoading, getSearchedQueries };
}

// React Query Hook for Deleting a query or an answer
export function useDeleteInteraction(queryId) {
  const queryClient = useQueryClient();
  const { isLoading, mutate } = useMutation({
    mutationFn: deleteInteraction,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["query", queryId],
      });
    },
    onError: (error) => {
      console.log(error);
      toast.error(error?.response?.data?.message || error.message);
    },
  });

  return { isLoading, deleteInteraction: mutate };
}

// React Query Hook for Editing an Answer
export function useUpdateAnswer(queryId) {
  const queryClient = useQueryClient();

  const updateAnswer = async (answerId, updatedData) => {
    try {
      // Track activity before editing an Answer
      await communityActivityService.updateActivity(
        "answer_edited",
        "You Updated an Answer",
      );

      const response = await axiosCommunity.patch(
        `/edit-answer/${answerId}`,
        updatedData,
      );

      // Optimistically update the cache
      queryClient.invalidateQueries({ queryKey: ["query", queryId] });

      return response.data;
    } catch (error) {
      console.error("Failed to update answer", error);
      throw error;
    }
  };

  return { updateAnswer };
}

// React Query Hook for Creating Query
export function useCreateQuery() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async (queryData) => {
      // Track activity before creating query
      await communityActivityService.updateActivity(
        "create_query",
        "You created a new query",
      );

      const response = await axiosCommunity.post("/", queryData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      return response.data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries("queries");
      toast.success("Query posted successfully");
      navigate(`/app/community/${data.queryId}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to post query");
    },
  });
}
