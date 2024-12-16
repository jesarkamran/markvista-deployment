export default function inValidate(queryClient, key, id = "") {
  if (id) {
    queryClient.invalidateQueries({ queryKey: [key, id] });
    return;
  }

  queryClient.invalidateQueries({ queryKey: [key] });
}
