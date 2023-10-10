import APIClient from "../services/api-client";

export const apiClient = new APIClient<{}>(`/Article/ActivateArticle`);

const useActive = (id: number, activeState: boolean) => {
  return apiClient.postActive({ id, activeState }).then((res) => res);
};
export default useActive;
