import APIClient from "../services/api-client";
import { Article } from "../entities/Article";

const apiClient = new APIClient(`/Article/EditArticle`);

const useEditArticle = () => {
  const editArticle = (id: number, updatedArticle: Article) => {
    try {
      const response = apiClient.putArticle(`/${id}`, updatedArticle);
      return response;
    } catch (error) {
      throw error;
    }
  };

  return editArticle;
};
export default useEditArticle;
