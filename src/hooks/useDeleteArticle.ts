import { Article } from "../entities/Article";
import APIClient from "../services/api-client";

export const apiClient = new APIClient<Article>(`/Article/DeleteArticle`);

const useDeleteArticle = (id: number) =>
  apiClient.delete(id).then((res) => res);
export default useDeleteArticle;
