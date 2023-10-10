import { useQuery } from "@tanstack/react-query";
import APIClient from "../services/api-client";

export const apiClient = new APIClient<Category[]>("/Article/GetAllCategories");

const useCategories = () =>
  useQuery(["Categories"], {
    queryFn: () => apiClient.getAll(),
  });

export default useCategories;
