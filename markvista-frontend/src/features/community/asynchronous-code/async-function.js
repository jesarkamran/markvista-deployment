import { axiosCommunity } from "@src/utils/api";

// Async function for React Query Hooks
export async function searchQuery(query) {
  const { data: responseData } = await axiosCommunity.get(
    `/queries?search=${query}`,
  );
  console.log(responseData);

  return responseData;
}

export async function getQuery(id) {
  const { data: responseData } = await axiosCommunity.get(`/${id}`);

  return responseData;
}

export async function getAllQueries() {
  const { data: responseData } = await axiosCommunity.get(`/queries`);
  return responseData;
}

export async function answerQuery(answer, id) {
  const { data: responseData } = await axiosCommunity.post(
    `/answer/${id}`,
    answer,
  );

  return responseData;
}

export async function deleteInteraction(id) {
  const { data: resp } = await axiosCommunity.delete(
    `/delete-query-or-answer/${id}`,
  );

  return resp;
}
